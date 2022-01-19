import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import sectionConfig from "../../components/designed-sections/sections.config";
import Layout from "../../components/Layout";
import SubHeader from "../../components/SubHeader";
import cca from "../../utils/cca";
import { BLOGS_PLAGE_LIMIT } from "../../utils/constants";
import { getAllContactInfo } from "../../utils/getAllContactInfo";
import { getAllPageContents } from "../../utils/getAllPageContents";
import { getAllTeamInfo } from "../../utils/getAllTeamInfo";
import { getAllVenueInfo } from "../../utils/getAllVenueInfo";
import { getClientCredentialsToken } from "../../utils/getClientCredentialsToken";
import {
  dynamicsBlogAuthorsQuery,
  dynamicsTeamsQuery,
  dynamicsWebpageQuery,
} from "../../utils/queries";
import {
  DynamicsMatch,
  DynamicsOrganizationContact,
  DynamicsPageProps,
  DynamicsPageSection,
  DynamicsSportsTeam,
  DynamicsVenue,
  xmlDynamicsBlog,
} from "../../utils/types";

interface ITeamIdProps extends DynamicsPageProps {}

interface IParams extends ParsedUrlQuery {
  teamId: string;
}

const TeamIdPage: React.FunctionComponent<ITeamIdProps> = (props) => {
  return (
    <Layout
      headerMenuItems={props.dynamicsHeaderMenuItems}
      footerMenuItems={props.dynamicsFooterMenuItems}
      companyLogoUrl={props.companyLogoUrl}
    >
      <SubHeader
        pageTitle={
          props.dynamicsSportsTeams.length === 1
            ? props.dynamicsSportsTeams[0].bsi_name
            : props.dynamicsPageName
        }
      />
      {props.dynamicsPageSections?.map(
        (s: any) =>
          sectionConfig[s["bsi_DesignedSection"].bsi_name] &&
          sectionConfig[s["bsi_DesignedSection"].bsi_name]({
            dynamicsPageSection: s,
            key: s.pagesectionid,
            dynamicsMatches: props.dynamicsSportsTeams[0].bsi_matches,
            events: props.dynamicsMatches,
            dynamicsSportsTeams: props.dynamicsSportsTeams,
            dynamicsBlogs: props.dynamicsBlogs,
            dynamicsOrganizationContacts: props.dynamicsOrganizationContacts,
            dynamicsTeamContacts: props.dynamicsSportsTeams[0].bsi_contacts,
            dynamicsVenues: props.dynamicsVenues,
          })
      )}
    </Layout>
  );
};

export default TeamIdPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const tokenResponse = await getClientCredentialsToken(cca);
  const accessToken = tokenResponse?.accessToken;
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  const dynamicsTeamsResult: any = (
    await retrieveMultiple(config, "bsi_sportsteams", dynamicsTeamsQuery)
  ).value;
  const paths: (
    | string
    | {
        params: IParams;
        locale?: string | undefined;
      }
  )[] = [];
  dynamicsTeamsResult.forEach((tr: any) => {
    paths.push({
      params: {
        teamId: tr.bsi_sportsteamid,
      },
    });
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
    const { teamId } = params as IParams;
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);

    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq 'Teams'&${dynamicsWebpageQuery}`
      )
    ).value;

    const {
      dynamicsPageSections,
      dynamicsHeaderMenuItems,
      dynamicsFooterMenuItems,
      dynamicsBlogs,
      dynamicsMatches,
    } = await getAllPageContents(
      config,
      dynamicsPageResult[0].bsi_webpageid,
      false,
      1,
      "",
      undefined,
      undefined,
      dynamicsPageResult[0].bsi_Website.bsi_HeaderMenu.bsi_headermenuid,
      dynamicsPageResult[0].bsi_Website.bsi_FooterMenu.bsi_footermenuid
    );

    const teams = await getAllTeamInfo(config, teamId);
    const contacts = await getAllContactInfo(config);
    const venues = await getAllVenueInfo(config);

    return {
      props: {
        preview: preview,
        dynamicsPageName: dynamicsPageResult[0].bsi_name,
        dynamicsPageSections: dynamicsPageSections,
        dynamicsSportsTeams: teams,
        dynamicsVenues: venues as DynamicsVenue[],
        dynamicsOrganizationContacts: contacts as DynamicsOrganizationContact[],
        dynamicsMatches: dynamicsMatches.value,
        dynamicsBlogs: dynamicsBlogs.value,
        dynamicsHeaderMenuItems: dynamicsHeaderMenuItems.value,
        dynamicsFooterMenuItems: dynamicsFooterMenuItems.value,
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
