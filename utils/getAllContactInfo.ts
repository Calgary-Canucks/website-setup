import { WebApiConfig, retrieveMultiple } from "dataverse-webapi/lib/node";

export const getAllContactInfo = async (config: WebApiConfig) => {
  try {
    const contacts = (
      await retrieveMultiple(
        config,
        "bsi_organizationcontacts",
        "$select=bsi_name,bsi_email,bsi_title"
      )
    ).value;
    return contacts;
  } catch (error) {
    throw error;
  }
};
