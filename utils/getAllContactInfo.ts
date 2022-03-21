import {
  WebApiConfig,
  retrieveMultiple,
  RetrieveMultipleResponse,
} from "dataverse-webapi/lib/node";
import { dynamicsOrganizationContactsQuery } from "./queries";

interface dynamicsWebApiResponse extends RetrieveMultipleResponse {
  error?: any;
}

export const getAllContactInfo = async (config: WebApiConfig) => {
  try {
    const contacts: dynamicsWebApiResponse = await retrieveMultiple(
      config,
      "contacts",
      dynamicsOrganizationContactsQuery
    );
    if (contacts.error) {
      throw new Error(contacts.error.message);
    }

    return contacts.value;
  } catch (error) {
    throw error;
  }
};
