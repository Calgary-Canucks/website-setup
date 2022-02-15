import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import { ParsedUrlQuery } from "querystring";
import React from "react";
import sectionConfig from "../components/designed-sections/sections.config";
import Layout from "../components/Layout";
import SubHeader from "../components/SubHeader";
import cca from "../utils/cca";
import { getAllContactInfo } from "../utils/getAllContactInfo";
import { getAllPageContents } from "../utils/getAllPageContents";
import { getAllTeamInfo } from "../utils/getAllTeamInfo";
import { getAllVenueInfo } from "../utils/getAllVenueInfo";
import { getClientCredentialsToken } from "../utils/getClientCredentialsToken";
import { dynamicsWebpageQuery } from "../utils/queries";
import {
  DynamicsBlog,
  DynamicsMatch,
  DynamicsOrganizationContact,
  DynamicsPageProps,
  DynamicsPageSection,
  DynamicsSportsTeam,
  DynamicsVenue,
} from "../utils/types";

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

export const getStaticPaths: GetStaticPaths = async () => {
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
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
    const { pageName } = params as IParams;

    const webpageName = pageName[pageName.length - 1];

    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq '${webpageName}'&${dynamicsWebpageQuery}`
      )
    ).value;

    const {
      dynamicsPageSections,
      dynamicsHeaderMenuItems,
      dynamicsFooterMenuItems,
      dynamicsMatches,
      dynamicsBlogs,
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
