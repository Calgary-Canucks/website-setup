import {
  retrieve,
  retrieveMultiple,
  WebApiConfig,
} from "dataverse-webapi/lib/node";
import { BLOGS_PLAGE_LIMIT } from "./constants";
import {
  attachedComponentsQuery,
  dynamicsFooterMenuItemsQuery,
  dynamicsHeaderMenuItemsQuery,
  dynamicsMatchesQuery,
  dynamicsPageSectionsQuery,
  dynamicsSocialPlatformsQuery,
  generateBlogsODataQuery,
} from "./queries";

export const getAllPageContents = async (
  config: WebApiConfig,
  webpageId: string,
  includeDraft: boolean = false,
  blogPageNumber?: number,
  blogCategory?: string,
  blogAuthor?: string,
  blogSlug?: string,
  headerMenuId?: string,
  footerMenuId?: string
) => {
  try {
    const dynamicsPageSections = (
      await retrieveMultiple(
        config,
        "bsi_pagesections",
        `$filter= _bsi_webpage_value eq ${webpageId} ${
          includeDraft ? "" : "and bsi_published ne false"
        }&${dynamicsPageSectionsQuery}`,
        { representation: true }
      )
    ).value;

    for (const section of dynamicsPageSections) {
      const attachedComponentsRequest: any[] = [];

      (section as any).bsi_AttachedComponent_bsi_PageSection_bsi.forEach(
        (po: any) => {
          attachedComponentsRequest.push(
            retrieve(
              config,
              "bsi_attachedcomponents",
              po.bsi_attachedcomponentid,
              (includeDraft ? "" : "$filter= bsi_published ne false&") +
                attachedComponentsQuery
            )
          );
        }
      );
      const result = await Promise.all(attachedComponentsRequest);

      section.bsi_AttachedComponent_bsi_PageSection_bsi = [...result];
    }

    const dynamicsHeaderMenuItemsRequest = retrieveMultiple(
      config,
      "bsi_navigationmenuitems",
      `$filter=_bsi_navigationmenu_value eq ${
        headerMenuId || "235c65d7-2a70-ec11-8f8e-000d3a09f130"
      }&` + dynamicsHeaderMenuItemsQuery,
      { representation: true }
    );
    const dynamicsFooterMenuItemsRequest = retrieveMultiple(
      config,
      "bsi_navigationmenuitems",
      `$filter=_bsi_navigationmenu_value eq ${
        footerMenuId || "525c65d7-2a70-ec11-8f8e-000d3a09f130"
      }&` + dynamicsFooterMenuItemsQuery,
      { representation: true }
    );

    const dynamicsMatchesRequest = retrieveMultiple(
      config,
      "msmedia_mediaevents",
      dynamicsMatchesQuery,
      { representation: true }
    );

    const dynamicsBlogsRequest =
      !blogCategory || !blogAuthor || !blogSlug
        ? retrieveMultiple(
            config,
            "bsi_blogs",
            `${generateBlogsODataQuery(
              blogPageNumber || 1,
              includeDraft,
              blogCategory,
              blogAuthor,
              blogSlug
            )}`,
            { maxPageSize: BLOGS_PLAGE_LIMIT }
          )
        : { value: {} };

    const dynamicsSocialPlatformRequest = retrieveMultiple(
      config,
      "bsi_socialplatforms",
      `${
        includeDraft ? "" : "$filter=bsi_published ne false&"
      }${dynamicsSocialPlatformsQuery}`
    );

    const promises = [
      dynamicsHeaderMenuItemsRequest,
      dynamicsFooterMenuItemsRequest,
      dynamicsBlogsRequest,
      dynamicsMatchesRequest,
      dynamicsSocialPlatformRequest,
    ];

    const otherResults = await Promise.all(promises);

    const [
      dynamicsHeaderMenuItems,
      dynamicsFooterMenuItems,
      dynamicsBlogs,
      dynamicsMatches,
      dynamicsSocialPlatforms,
    ] = otherResults;

    return {
      dynamicsPageSections,
      dynamicsHeaderMenuItems,
      dynamicsFooterMenuItems,
      dynamicsBlogs,
      dynamicsMatches,
      dynamicsSocialPlatforms,
    };
  } catch (error) {
    throw error;
  }
};
