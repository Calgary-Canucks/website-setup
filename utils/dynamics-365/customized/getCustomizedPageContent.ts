import { WebApiConfig } from "dataverse-webapi/lib/node";
import { getAllEventInfo } from "./getAllEventInfo";
import { getAllOrganizationContactInfo } from "./getAllOrganizationContactInfo";
import { getAllTeamInfo } from "./getAllTeamInfo";
import { getAllVenueInfo } from "./getAllVenueInfo";

export const getCustomizedPageContent = async (
  config: WebApiConfig,
  teamId?: string
) => {
  try {
    const requests = [
      getAllEventInfo(config),
      getAllTeamInfo(config, teamId),
      getAllVenueInfo(config),
      getAllOrganizationContactInfo(config),
    ];
    const result = await Promise.all(requests);
    const [
      dynamicsEvents,
      dynamicsTeams,
      dynamicsVenues,
      dynamicsOrganizationContacts,
    ] = result;
    return {
      dynamicsEvents,
      dynamicsTeams,
      dynamicsVenues,
      dynamicsOrganizationContacts,
    };
  } catch (error) {
    throw error;
  }
};
