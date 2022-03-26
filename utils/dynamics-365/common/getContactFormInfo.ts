import { WebApiConfig, retrieve } from "dataverse-webapi/lib/node";

export const getContactFormInfo = async (
  config: WebApiConfig,
  contactformid: string
) => {
  try {
    const contactForm = await retrieve(
      config,
      "bsi_contactforms",
      contactformid
    );
    return contactForm;
  } catch (error) {
    throw error;
  }
};
