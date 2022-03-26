import { WebApiConfig, retrieveMultiple } from "dataverse-webapi/lib/node";
import { dynamicsSportsPlayersQuery, dynamicsTeamsQuery } from "./queries";
import { dynamicsEventsQuery } from "./queries";

export const getAllTeamInfo = async (config: WebApiConfig, teamId?: string) => {
  try {
    //If teamId is given, find the specific team and return the result together with events information
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
          `$filter= _msmedia_hometeam_value eq ${teamId} or _msmedia_visitingteam_value eq ${teamId}&${dynamicsEventsQuery}`
        )
      ).value;
      team[0].bsi_matches = matches;
      team[0].bsi_contacts = sportsPlayers;
      return team;
    }

    //If no teamId is given, retrieve all the teams and return the results together with events information
    const teams = (
      await retrieveMultiple(
        config,
        "msmedia_sportsteams",
        `${dynamicsTeamsQuery}&$orderby=_msmedia_division_value asc`
      )
    ).value;

    const teamMatchQueries: any[] = [];

    teams.forEach((t) => {
      teamMatchQueries.push(
        retrieveMultiple(
          config,
          "msmedia_mediaevents",
          `$filter= _msmedia_hometeam_value eq ${t.msmedia_sportsteamid} or _msmedia_visitingteam_value eq ${t.msmedia_sportsteamid}&${dynamicsEventsQuery}&$top=3`
        )
      );
    });

    const result = await Promise.all(teamMatchQueries);

    teams.forEach((t, index) => {
      t.matches = result[index].value;
    });

    return teams;
  } catch (error) {
    throw error;
  }
};
