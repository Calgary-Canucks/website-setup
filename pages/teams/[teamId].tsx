import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { GetStaticPaths, GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import sectionConfig from "../../designed-sections/sections.config";
import Layout from "../../components/common/Layout";
import SubHeader from "../../components/common/SubHeader";
import { instantiateCca } from "../../utils/msal/cca";
import { getAllPageContents } from "../../utils/dynamics-365/common/getAllPageContents";
import { getClientCredentialsToken } from "../../utils/msal/getClientCredentialsToken";
import { dynamicsWebpageQuery } from "../../utils/dynamics-365/common/queries";
import { DynamicsPageProps } from "../../types/dynamics-365/common/types";
import { getCustomizedPageContent } from "../../utils/dynamics-365/customized/getCustomizedPageContent";
import { dynamicsTeamsQuery } from "../../utils/dynamics-365/customized/queries";
import {
  DynamicsSportsTeam,
  DynamicsVenue,
  DynamicsOrganizationContact,
} from "../../types/dynamics-365/customized/types";

//This Page is CUSTOMIZED for orgs who have Media & Entertainment Accelerator

interface ITeamIdProps extends DynamicsPageProps {}

interface IParams extends ParsedUrlQuery {
  teamId: string;
}

const TeamIdPage: React.FunctionComponent<ITeamIdProps> = (props) => {
  return (
    <Layout
      headerMenuItems={props.dynamicsHeaderMenuItems}
      footerMenuItems={props.dynamicsFooterMenuItems}
      dynamicsSocialPlatforms={props.dynamicsSocialPlatforms}
      companyLogoUrl={props.companyLogoUrl}
    >
      <SubHeader
        pageTitle={
          props.dynamicsSportsTeams.length === 1
            ? props.dynamicsSportsTeams[0].msmedia_name
            : props.dynamicsPageName
        }
      />

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
            dynamicsMatches={props.dynamicsSportsTeams[0].bsi_matches}
          />
        );
      })}
    </Layout>
  );
};

export default TeamIdPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const cca = await instantiateCca();
  const tokenResponse = await getClientCredentialsToken(cca);
  const accessToken = tokenResponse?.accessToken;
  const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);
  const dynamicsTeamsResult: any = (
    await retrieveMultiple(config, "msmedia_sportsteams", dynamicsTeamsQuery)
  ).value;
  const paths: (
    | string
    | {
        params: IParams;
        locale?: string | undefined;
      }
  )[] = [];
  dynamicsTeamsResult.forEach((tr: DynamicsSportsTeam) => {
    paths.push({
      params: {
        teamId: tr.msmedia_sportsteamid,
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
    const cca = await instantiateCca();
    const tokenResponse = await getClientCredentialsToken(cca);
    const accessToken = tokenResponse?.accessToken;
    const config = new WebApiConfig("9.1", accessToken, process.env.CLIENT_URL);

    const dynamicsPageResult: any[] = (
      await retrieveMultiple(
        config,
        "bsi_webpages",
        `$filter=bsi_name eq 'Team Template'&${dynamicsWebpageQuery}`
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
      1,
      "",
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
    } = await getCustomizedPageContent(config, teamId);

    return {
      props: {
        preview: preview,
        dynamicsPageName: dynamicsPageResult[0].bsi_name,
        dynamicsPageSections: dynamicsPageSections,
        dynamicsSportsTeams: dynamicsTeams,
        dynamicsVenues: dynamicsVenues as DynamicsVenue[],
        dynamicsOrganizationContacts:
          dynamicsOrganizationContacts as DynamicsOrganizationContact[],
        dynamicsMatches: dynamicsEvents,
        dynamicsBlogs: dynamicsBlogs.value,
        dynamicsHeaderMenuItems: dynamicsHeaderMenuItems.value,
        dynamicsFooterMenuItems: dynamicsFooterMenuItems.value,
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
