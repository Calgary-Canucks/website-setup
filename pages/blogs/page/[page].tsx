import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import sectionConfig from "../../../designed-sections/sections.config";
import Layout from "../../../components/common/Layout";
import SubHeader from "../../../components/common/SubHeader";
import { instantiateCca } from "../../../utils/msal/cca";
import { getAllPageContents } from "../../../utils/dynamics-365/common/getAllPageContents";
import { getClientCredentialsToken } from "../../../utils/msal/getClientCredentialsToken";
import {
  dynamicsBlogSlugsQuery,
  dynamicsWebpageQuery,
} from "../../../utils/dynamics-365/common/queries";
import {
  DynamicsBlog,
  DynamicsPageProps,
  DynamicsPageSection,
} from "../../../types/dynamics-365/common/types";
import { getCustomizedPageContent } from "../../../utils/dynamics-365/customized/getCustomizedPageContent";
import {
  DynamicsSportsTeam,
  DynamicsVenue,
  DynamicsOrganizationContact,
  DynamicsMatch,
} from "../../../types/dynamics-365/customized/types";

interface IBlogPageProps extends DynamicsPageProps {}

interface IParams extends ParsedUrlQuery {
  page: string;
}

const BlogPage: React.FunctionComponent<IBlogPageProps> = (props) => {
  return (
    <Layout
      headerMenuItems={props.dynamicsHeaderMenuItems}
      footerMenuItems={props.dynamicsFooterMenuItems}
      dynamicsSocialPlatforms={props.dynamicsSocialPlatforms}
      companyLogoUrl={props.companyLogoUrl}
      preview={props.preview}
    >
      <SubHeader pageTitle={props.dynamicsPageName} />

      {props.dynamicsPageSections?.map((s) => {
        const Section = sectionConfig[s.bsi_DesignedSection.bsi_name];
        return (
          <Section
            key={s.bsi_pagesectionid}
            dynamicsPageSection={s}
            events={props.dynamicsMatches}
            dynamicsSportsTeams={props.dynamicsSportsTeams}
            dynamicsOrganizationContacts={props.dynamicsOrganizationContacts}
            dynamicsVenues={props.dynamicsVenues}
            dynamicsBlogs={props.dynamicsBlogs}
          />
        );
      })}
    </Layout>
  );
};

export default BlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const cca = await instantiateCca();
  const tokenResponse = await getClientCredentialsToken(cca);
  const accessToken = tokenResponse?.accessToken;
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  const dynamicsBlogsResult: any = (
    await retrieveMultiple(config, "bsi_blogs", dynamicsBlogSlugsQuery)
  ).value;
  const paths: (
    | string
    | {
        params: IParams;
        locale?: string | undefined;
      }
  )[] = [];

  const maxPage = Math.ceil(
    dynamicsBlogsResult.length / parseInt(process.env.BLOGS_PAGE_SIZE!)
  );
  for (let i = 1; i <= maxPage; i++) {
    paths.push({
      params: {
        page: i + "",
      },
    });
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
}) => {
  try {
    const { page } = params as IParams;
    const cca = await instantiateCca();
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;

    const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);

    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq 'Blogs'&${dynamicsWebpageQuery}`
      )
    ).value;

    const {
      dynamicsPageSections,
      dynamicsHeaderMenuItems,
      dynamicsFooterMenuItems,
      dynamicsBlogs,
      dynamicsSocialPlatforms,
    } = await getAllPageContents(
      config,
      dynamicsPageResult[0].bsi_webpageid,
      false,
      parseInt(page),
      "",
      "",
      undefined,
      dynamicsPageResult[0].bsi_Website.bsi_HeaderMenu.bsi_navigationmenuid,
      dynamicsPageResult[0].bsi_Website.bsi_FooterMenu.bsi_navigationmenuid
    );

    const {
      dynamicsEvents,
      dynamicsOrganizationContacts,
      dynamicsTeams,
      dynamicsVenues,
    } = await getCustomizedPageContent(config);

    return {
      props: {
        preview: preview,
        dynamicsPageName: dynamicsPageResult[0].bsi_name as string,
        dynamicsPageSections: dynamicsPageSections as DynamicsPageSection[],
        dynamicsSportsTeams: dynamicsTeams as DynamicsSportsTeam[],
        dynamicsVenues: dynamicsVenues as DynamicsVenue[],
        dynamicsOrganizationContacts:
          dynamicsOrganizationContacts as DynamicsOrganizationContact[],
        dynamicsMatches: dynamicsEvents as DynamicsMatch[],
        dynamicsBlogs: dynamicsBlogs.value as DynamicsBlog[],
        dynamicsHeaderMenuItems: dynamicsHeaderMenuItems.value as any[],
        dynamicsFooterMenuItems: dynamicsFooterMenuItems.value as any[],
        dynamicsSocialPlatforms: dynamicsSocialPlatforms.value,
        companyLogoUrl:
          dynamicsPageResult[0].bsi_Website.bsi_CompanyLogo.bsi_cdnurl,
      },
    };
  } catch (error: any) {
    console.log(error);
    return {
      props: {
        error,
      },
    };
  }
};
