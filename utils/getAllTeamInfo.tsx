import { WebApiConfig, retrieveMultiple } from "dataverse-webapi/lib/node";
import {
  dynamicsMatchesQuery,
  dynamicsSportsPlayersQuery,
  dynamicsTeamsQuery,
} from "./queries";

export const getAllTeamInfo = async (config: WebApiConfig, teamId?: string) => {
  try {
    if (teamId) {
      const team = (
        await retrieveMultiple(
          config,
          "msmedia_sportsteams",
          `$filter= msmedia_sportsteamid eq ${teamId}&${dynamicsTeamsQuery}`,
          { representation: true }
        )
      ).value;

      const sportsPlayers: any = (
        await retrieveMultiple(
          config,
          "msmedia_sportsplayers",
          `$filter=Microsoft.Dynamics.CRM.ContainValues(PropertyName='bsi_teamrole',PropertyValues='606600002') and _msmedia_currentteam_value eq ${teamId}&${dynamicsSportsPlayersQuery}`,
          { representation: true }
        )
      ).value;
      const matches = (
        await retrieveMultiple(
          config,
          "msmedia_mediaevents",
          `$filter= _msmedia_hometeam_value eq ${teamId} or _msmedia_visitingteam_value eq ${teamId}&${dynamicsMatchesQuery}`
        )
      ).value;
      team[0].bsi_matches = matches;
      team[0].bsi_contacts = sportsPlayers;
      return team;
    }
    const teams = (
      await retrieveMultiple(
        config,
        "msmedia_sportsteams",
        `${dynamicsTeamsQuery}&$orderby=_msmedia_division_value asc`
      )
    ).value;

    const teamMatchQueries: any[] = [];
    // const teamContactQueries: any[] = [];

    teams.forEach((t) => {
      teamMatchQueries.push(
        retrieveMultiple(
          config,
          "msmedia_mediaevents",
          `$filter= _msmedia_hometeam_value eq ${t.msmedia_sportsteamid} or _msmedia_visitingteam_value eq ${t.msmedia_sportsteamid}&${dynamicsMatchesQuery}&$top=3`
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
      t.matches = result[index].value;
      //   t.bsi_contacts = contacts[index].value;
    });

    return teams;
  } catch (error) {
    throw error;
  }
};
