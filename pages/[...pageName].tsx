import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import sectionConfig from "../designed-sections/sections.config";
import Layout from "../components/common/Layout";
import SubHeader from "../components/common/SubHeader";
import { instantiateCca } from "../utils/msal/cca";
import { getAllPageContents } from "../utils/dynamics-365/common/getAllPageContents";
import { getClientCredentialsToken } from "../utils/msal/getClientCredentialsToken";
import { dynamicsWebpageQuery } from "../utils/dynamics-365/common/queries";
import { disconnect } from "../utils/redisDB/redis";
import {
  DynamicsBlog,
  DynamicsMatch,
  DynamicsOrganizationContact,
  DynamicsPageProps,
  DynamicsPageSection,
  DynamicsVenue,
} from "../utils/dynamics-365/common/types";
import { getCustomizedPageContent } from "../utils/dynamics-365/customized/getCustomizedPageContent";

interface DynamicsPagesProps extends DynamicsPageProps {}

interface IParams extends ParsedUrlQuery {
  pageName: string;
}

const DynamicsPages: NextPage<DynamicsPagesProps> = (
  props: DynamicsPagesProps
) => {
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

export const getStaticPaths: GetStaticPaths = async () => {
  const cca = await instantiateCca();
  const tokenResponse = await getClientCredentialsToken(cca);
  const accessToken = tokenResponse?.accessToken;
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  const dynamicsPagesResult: any = (
    await retrieveMultiple(
      config,
      "bsi_webpages",
      "$filter=bsi_published ne false&$select=bsi_name,bsi_pageurl"
    )
  ).value;
  const paths: {
    params: IParams;
    locale?: string | undefined;
  }[] = [];
  dynamicsPagesResult.forEach((pr: any) => {
    if (!pr.bsi_pageurl.includes("[") && !pr.bsi_pageurl.includes("template")) {
      const urls = pr.bsi_pageurl.substring(1).split("/");
      paths.push({
        params: {
          pageName: urls,
        },
      });
    }
  });

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
    const { pageName } = params as IParams;

    const webpageName = pageName[pageName.length - 1];

    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq '${webpageName.replace(
          /-/g,
          " "
        )}'&${dynamicsWebpageQuery}`
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
      undefined,
      undefined,
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
    await disconnect();

    return {
      props: {
        preview: preview,
        dynamicsPageName: dynamicsPageResult[0].bsi_name as string,
        dynamicsPageSections: dynamicsPageSections as DynamicsPageSection[],
        dynamicsSportsTeams: dynamicsTeams,
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

export default DynamicsPages;
