import { WebApiConfig, retrieveMultiple } from "dataverse-webapi/lib/node";
import { dynamicsVenuesQuery } from "./queries";

export const getAllVenueInfo = async (config: WebApiConfig) => {
  try {
    const venues = (
      await retrieveMultiple(config, "bsi_venues", dynamicsVenuesQuery)
    ).value;
    return venues;
  } catch (error) {
    throw error;
  }
};
