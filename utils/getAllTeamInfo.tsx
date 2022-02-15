import { WebApiConfig, retrieveMultiple } from "dataverse-webapi/lib/node";
import { dynamicsMatchesQuery, dynamicsTeamsQuery } from "./queries";

export const getAllTeamInfo = async (config: WebApiConfig, teamId?: string) => {
  try {
    if (teamId) {
      const team = (
        await retrieveMultiple(
          config,
          "bsi_sportsteams",
          `$filter= bsi_sportsteamid eq ${teamId}&${dynamicsTeamsQuery}`,
          { representation: true }
        )
      ).value;

      const contacts: any = (
        await retrieveMultiple(
          config,
          "bsi_sportsteammembers",
          `$filter=_bsi_sportsteam_value eq ${teamId} and bsi_SportsTeamMember_bsi_SportsTeamRoles_/any(o:o/bsi_name eq 'Team Administrator')&$select=bsi_name,bsi_email&$expand=bsi_SportsTeamMember_bsi_SportsTeamRoles_($select=bsi_name),bsi_ProfilePicture($select=bsi_alttext,bsi_cdnurl)`
        )
      ).value;
      const matches = (
        await retrieveMultiple(
          config,
          "bsi_matchs",
          `$filter= _bsi_teamone_value eq ${teamId} or _bsi_teamtwo_value eq ${teamId}&${dynamicsMatchesQuery}`
        )
      ).value;
      team[0].bsi_matches = matches;
      team[0].bsi_contacts = contacts;
      return team;
    }
    const teams = (
      await retrieveMultiple(
        config,
        "bsi_sportsteams",
        `${dynamicsTeamsQuery}&$orderby=_bsi_agegroup_value asc`
      )
    ).value;

    const teamMatchQueries: any[] = [];
    // const teamContactQueries: any[] = [];

    teams.forEach((t) => {
      teamMatchQueries.push(
        retrieveMultiple(
          config,
          "bsi_matchs",
          `$filter= _bsi_teamone_value eq ${t.bsi_sportsteamid} or _bsi_teamtwo_value eq ${t.bsi_sportsteamid}&${dynamicsMatchesQuery}&$top=3`
        )
      );
      //   teamContactQueries.push(
      //     retrieveMultiple(
      //       config,
      //       "bsi_sportsteammembers",
      //       `$filter=_bsi_sportsteam_value eq ${t.bsi_sportsteamid} and bsi_SportsTeamMember_bsi_SportsTeamRoles_/any(o:o/bsi_name eq 'Team Administrator')&$select=bsi_name,bsi_email&$expand=bsi_SportsTeamMember_bsi_SportsTeamRoles_($select="bsi_name)`
      //     )
      //   );
    });

    const result = await Promise.all(teamMatchQueries);
    // const contacts = await Promise.all(teamContactQueries);

    teams.forEach((t, index) => {
      t.bsi_matches = result[index].value;
      //   t.bsi_contacts = contacts[index].value;
    });

    return teams;
  } catch (error) {
    throw error;
  }
};
