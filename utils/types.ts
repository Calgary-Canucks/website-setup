export interface DesignedSection {
  dynamicsPageSection: DynamicsPageSection;
}

export type MenuItem = {
  name: string;
  url: string;
};

export type NavbarItem = {
  face: MenuItem;
  dropdown: MenuItem[];
};

export type SectionItem = {
  name: string;
  sectionId: string;
};

export type DynamicsContactForm = {
  bsi_name: string;
  bsi_contactformid: string;
};

export type DynamicsContactFormField = {
  bsi_name: string;
  bsi_contactfieldlogicname: string;
  bsi_fieldname: string;
  bsi_sequence: number;
  bsi_fieldtype: number;
};

export type DynamicsMatch = {
  bsi_name: string;
  bsi_matchid: string;
  bsi_TeamOne: {
    bsi_name: string;
    bsi_sportsteamid: string;
  };
  bsi_TeamTwo: {
    bsi_name: string;
    bsi_sportsteamid: string;
  };
  bsi_teamonescore: number;
  bsi_teamtwoscore: number;
  bsi_matchtime: Date;
  bsi_Venue: {
    bsi_name: string;
    bsi_addressline1: string;
  };
};

export type DynamicsBlog = {
  bsi_name: string;
  bsi_BlogCoverImage: {
    bsi_name: string;
    bsi_cdnurl: string;
    bsi_alttext: string;
  };
  bsi_blogcovertext: string;
  bsi_blogid: string;
  bsi_slug: string;
  bsi_Blog_bsi_BlogAuthor_bsi_BlogAuthor: Array<{
    bsi_name: string;
    bsi_slug: string;
  }>;
  bsi_BlogCategory_bsi_Blog_bsi_Blog: Array<{
    bsi_name: string;
    bsi_slug: string;
  }>;
  bsi_blogbody: string;
  modifiedon: string;
};

export type xmlDynamicsBlog = {
  bsi_name: string;
  "bsi_imageasset3.bsi_alttext": string;
  "bsi_imageasset3.bsi_cdnurl": string;
  bsi_blogcovertext: string;
  bsi_blogid: string;
  bsi_urlslug: string;
  bsi_author: string;
  bsi_blogbody: string;
  modifiedon: string;
};

export interface DynamicsPageProps {
  error?: any;
  dynamicsPageName: string;
  dynamicsVenues: DynamicsVenue[];
  dynamicsOrganizationContacts: DynamicsOrganizationContact[];
  dynamicsPageSections: DynamicsPageSection[];
  dynamicsMatches: DynamicsMatch[];
  dynamicsSportsTeams: DynamicsSportsTeam[];
  dynamicsHeaderMenuItems: any[];
  dynamicsFooterMenuItems: any[];
  dynamicsBlogs: DynamicsBlog[];
  companyLogoUrl: string;
  preview: boolean;
}

export type DynamicsVenue = {
  bsi_name: string;
  bsi_addressline1: string;
  bsi_city: string;
  bsi_province: string;
  bsi_postalcode: string;
  bsi_latitude: string;
  bsi_longtitude: string;
  bsi_venueid: string;
};

export type DynamicsOrganizationContact = {
  bsi_name: string;
  bsi_email: string;
  bsi_title: string;
  bsi_organizationcontactid: string;
  bsi_ProfilePicture: {
    bsi_alttext: string;
    bsi_cdnurl: string;
  };
};

export type DynamicsSportsTeam = {
  bsi_name: string;
  bsi_teaminfo: string;
  bsi_description: string;
  bsi_sportsteamid: string;
  bsi_TeamImage: {
    bsi_alttext: string;
    bsi_cdnurl: string;
  };
  bsi_AgeGroup: {
    bsi_agegroupid: string;
    bsi_name: string;
  };
  bsi_Match_TeamOne_bsi_SportsTeam: Array<{
    bsi_name: string;
    bsi_matchid: string;
  }>;
  bsi_Match_TeamTwo_bsi_SportsTeam: Array<{
    bsi_name: string;
    bsi_matchid: string;
  }>;
  bsi_matches: DynamicsMatch[];
  bsi_contacts: Array<{
    bsi_name: string;
    bsi_email: string;
    bsi_ProfilePicture: {
      bsi_alttext: string;
      bsi_cdnurl: string;
    };
    bsi_sportsteammemberid: string;
    bsi_SportsTeamMember_bsi_SportsTeamRoles_: Array<{
      bsi_name: string;
      bsi_sportsteamroleid: string;
    }>;
  }>;
};

export type DynamicsPageSection = {
  bsi_name: string;
  bsi_pagesectionid: string;
  bsi_videourl: string;
  bsi_paragraph: string;
  bsi_hasctabutton: boolean;
  bsi_ctabuttonlink: string;
  bsi_ctabuttontext: string;
  bsi_youtubevideoid: string;
  bsi_youtubevideoalttext: string;
  _bsi_designedsection_value: string;
  bsi_overline: string;
  bsi_mainheading: string;
  bsi_subheading: string;
  bsi_sectionid: string;
  bsi_featuredproducts: string;
  bsi_backgroundcolor: string;
  bsi_bordercolor: string;
  bsi_overlinetextcolor: string;
  bsi_mainheadingtextcolor: string;
  bsi_subheadingtextcolor: string;
  bsi_paragraphtextcolor: string;
  bsi_ctabuttontextcolor: string;
  bsi_ctabuttonhoverbgcolor: string;
  bsi_ctabuttonbgcolor: string;
  bsi_AttachedComponent_bsi_PageSection_bsi: Array<{
    bsi_attachedcomponentid: string;
    bsi_name: string;
    bsi_description: string;
    bsi_descriptiontextcolor: string;
    bsi_hasctabutton: boolean;
    bsi_ctabuttontext: string;
    bsi_ctabuttonlink: string;
    bsi_ctabuttonbgcolor: string;
    bsi_ctabuttonhoverbgcolor: string;
    bsi_ctabuttontextcolor: string;
    bsi_backgroundcolor: string;
    bsi_bordercolor: string;
    bsi_overline: string;
    bsi_overlinetextcolor: string;
    bsi_title: string;
    bsi_titletextcolor: string;
    bsi_subtitle: string;
    bsi_subtitletextcolor: string;
    bsi_AttachedComponent_bsi_ImageAsset_bsi_: Array<{
      bsi_cdnurl: string;
      bsi_name: string;
    }>;
  }>;
  bsi_PageSection_bsi_ImageAsset_bsi_ImageA: Array<{
    bsi_imageassetid: string;
    bsi_name: string;
    bsi_cdnurl: string;
    bsi_alttext: string;
    bsi_referencingurl: string;
  }>;

  bsi_DesignedSection: {
    bsi_name: string;
  };
  bsi_Background: {
    bsi_cdnurl: string;
  };
  bsi_MarketingFormPage: {
    msdyncrm_javascriptcode: string;
  };
};

export type PageSection = {
  fields: {
    sectionType: string;
    ctaButtonLink: string;
    ctaButtonText: string;
    sectionId: string;
    sectionMainHeading: string;
    sectionName: string;
    sectionSubHeading: string;
    sectionParagraph?: string;
    videoUrl?: string;
    youtubeVideoId?: string;
    youtubeVideoAltText?: string;
    featuredProducts?: string[];
    sequence: number;
    page: {
      sys: {
        id: string;
      };
      fields: {
        pageName: string;
      };
    };
    sectionBackgroundImage: {
      sys: {
        id: string;
      };
      fields: {
        description: string;
        file: {
          fileName: string;
          url: string;
          contentType: string;
        };
        title: string;
      };
    };
    displayedProducts?: [
      {
        sys: { id: string };
        fields: {
          productDescription: string;
          productName: string;
          subheading: string;
          relativeUrl: string;
          ctaButtonText: string;
          ctaButtonLink: string;
          productImage: {
            fields: {
              title: string;
              file: {
                fileName: string;
                url: string;
                contentType: string;
              };
            };
            sys: {
              id: string;
            };
          };
        };
      }
    ];
    carouselImages?: [
      {
        sys: { id: string };
        fields: {
          title: string;
          file: {
            fileName: string;
            url: string;
            contentType: string;
          };
        };
      }
    ];
  };
  sys: {
    id: string;
  };
};
