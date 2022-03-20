import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import sectionConfig from "../../../components/designed-sections/sections.config";
import Layout from "../../../components/Layout";
import SubHeader from "../../../components/SubHeader";
import cca from "../../../utils/cca";
import { BLOGS_PLAGE_LIMIT } from "../../../utils/constants";
import { getAllContactInfo } from "../../../utils/getAllContactInfo";
import { getAllPageContents } from "../../../utils/getAllPageContents";
import { getAllTeamInfo } from "../../../utils/getAllTeamInfo";
import { getAllVenueInfo } from "../../../utils/getAllVenueInfo";
import { getClientCredentialsToken } from "../../../utils/getClientCredentialsToken";
import {
  dynamicsBlogSlugsQuery,
  dynamicsWebpageQuery,
} from "../../../utils/queries";
import {
  DynamicsBlog,
  DynamicsMatch,
  DynamicsOrganizationContact,
  DynamicsPageProps,
  DynamicsPageSection,
  DynamicsSportsTeam,
  DynamicsVenue,
} from "../../../utils/types";

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

      {props.dynamicsPageSections?.map(
        (s: any) =>
          sectionConfig[s["bsi_DesignedSection"].bsi_name] &&
          sectionConfig[s["bsi_DesignedSection"].bsi_name]({
            dynamicsPageSection: s,
            key: s.pagesectionid,
            dynamicsMatches: props.dynamicsMatches,
            events: props.dynamicsMatches,
            dynamicsSportsTeams: props.dynamicsSportsTeams,
            dynamicsBlogs: props.dynamicsBlogs,
            dynamicsOrganizationContacts: props.dynamicsOrganizationContacts,
            dynamicsVenues: props.dynamicsVenues,
          })
      )}
    </Layout>
  );
};

export default BlogPage;

export const getStaticPaths: GetStaticPaths = async () => {
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

  const maxPage = Math.ceil(dynamicsBlogsResult.length / BLOGS_PLAGE_LIMIT);
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
      dynamicsMatches,
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

    const teams = await getAllTeamInfo(config);
    const contacts = await getAllContactInfo(config);
    const venues = await getAllVenueInfo(config);

    return {
      props: {
        preview: preview,
        dynamicsPageName: dynamicsPageResult[0].bsi_name as string,
        dynamicsPageSections: dynamicsPageSections as DynamicsPageSection[],
        dynamicsSportsTeams: teams as DynamicsSportsTeam[],
        dynamicsVenues: venues as DynamicsVenue[],
        dynamicsOrganizationContacts: contacts as DynamicsOrganizationContact[],
        dynamicsMatches: dynamicsMatches.value as DynamicsMatch[],
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
