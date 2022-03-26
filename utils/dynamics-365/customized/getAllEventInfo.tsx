import { retrieveMultiple, WebApiConfig } from "dataverse-webapi/lib/node";
import { dynamicsEventsQuery } from "./queries";

export const getAllEventInfo = async (config: WebApiConfig) => {
  const dynamicsEvents = await retrieveMultiple(
    config,
    "msmedia_mediaevents",
    dynamicsEventsQuery,
    { representation: true }
  );
  return dynamicsEvents.value;
};
