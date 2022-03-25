import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps } from "next";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import * as React from "react";
import sectionConfig from "../../components/designed-sections/sections.config";
import Layout from "../../components/Layout";
import { instantiateCca } from "../../utils/cca";
import { getAllContactInfo } from "../../utils/getAllContactInfo";
import { getAllPageContents } from "../../utils/getAllPageContents";
import { getAllTeamInfo } from "../../utils/getAllTeamInfo";
import { getAllVenueInfo } from "../../utils/getAllVenueInfo";
import { getClientCredentialsToken } from "../../utils/getClientCredentialsToken";
import {
  dynamicsBlogSlugsQuery,
  dynamicsWebpageQuery,
} from "../../utils/queries";
import {
  DynamicsBlog,
  DynamicsMatch,
  DynamicsOrganizationContact,
  DynamicsPageProps,
  DynamicsPageSection,
  DynamicsSportsTeam,
  DynamicsVenue,
} from "../../utils/types";

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
      dynamicsMatches,
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
    console.log(error.message);
    return {
      props: {
        error,
      },
    };
  }
};
