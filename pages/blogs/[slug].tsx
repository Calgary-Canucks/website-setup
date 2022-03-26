import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import sectionConfig from "../../designed-sections/sections.config";
import Layout from "../../components/common/Layout";
import { instantiateCca } from "../../utils/msal/cca";
import { getAllPageContents } from "../../utils/dynamics-365/common/getAllPageContents";
import { getClientCredentialsToken } from "../../utils/msal/getClientCredentialsToken";
import {
  dynamicsBlogSlugsQuery,
  dynamicsWebpageQuery,
} from "../../utils/dynamics-365/common/queries";
import {
  DynamicsBlog,
  DynamicsPageProps,
  DynamicsPageSection,
} from "../../types/dynamics-365/common/types";
import { getCustomizedPageContent } from "../../utils/dynamics-365/customized/getCustomizedPageContent";
import {
  DynamicsSportsTeam,
  DynamicsVenue,
  DynamicsOrganizationContact,
  DynamicsMatch,
} from "../../types/dynamics-365/customized/types";

interface IParams extends ParsedUrlQuery {
  slug: string;
}

interface ISlugProps extends DynamicsPageProps {}

const Slug: React.FunctionComponent<ISlugProps> = (props) => {
  const router = useRouter();
  if (typeof window !== "undefined") {
    if (props.dynamicsBlogs.length === 0) {
      router.push("/404");
    }
  }
  return (
    <Layout
      headerMenuItems={props.dynamicsHeaderMenuItems}
      footerMenuItems={props.dynamicsFooterMenuItems}
      dynamicsSocialPlatforms={props.dynamicsSocialPlatforms}
      companyLogoUrl={props.companyLogoUrl}
      preview={props.preview}
    >
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

export default Slug;

export const getStaticPaths: GetStaticPaths = async () => {
  const cca = await instantiateCca();
  const tokenResponse = await getClientCredentialsToken(cca);
  const accessToken = tokenResponse?.accessToken;
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  const dynamicsBlogSlugsResult: any = (
    await retrieveMultiple(config, "bsi_blogs", dynamicsBlogSlugsQuery)
  ).value;
  const paths: (
    | string
    | {
        params: IParams;
        locale?: string | undefined;
      }
  )[] = [];
  dynamicsBlogSlugsResult.forEach((br: any) =>
    paths.push({
      params: {
        slug: (br.bsi_slug as String).toLowerCase().replace(/ /g, "-"),
      },
    })
  );
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
    const cca = await instantiateCca();
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);

    const { slug } = params as IParams;

    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq 'Blog Template'&${dynamicsWebpageQuery}`
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
      preview,
      1,
      "",
      "",
      slug,
      dynamicsPageResult[0].bsi_Website.bsi_HeaderMenu.bsi_navigationmenuid,
      dynamicsPageResult[0].bsi_Website.bsi_FooterMenu.bsi_navigationmenuid
    );
    if ((dynamicsBlogs.value as any).length === 0) {
      return {
        notFound: true,
      };
    }
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
    console.log(error.message);
    return {
      props: {
        error,
      },
    };
  }
};
