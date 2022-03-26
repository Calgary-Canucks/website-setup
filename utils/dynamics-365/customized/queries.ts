export const dynamicsEventsQuery =
  "$select=msmedia_name,msmedia_hometeamscore,msmedia_visitingteamscore,bsi_starttime,msmedia_eventtimezone&$orderby=msmedia_startdate asc&$expand=msmedia_HomeTeam($select=msmedia_name),msmedia_VisitingTeam($select=msmedia_name),msmedia_PrimaryVenue($select=msmedia_name,msmedia_addressline1)";

export const dynamicsVenuesQuery =
  "$select=msmedia_name,msmedia_addressline1,msmedia_latitude,msmedia_longitude,msmedia_addresscity,msmedia_addressstateorprovince,msmedia_addresspostalcode,msmedia_addresscountry";

export const dynamicsTeamsQuery =
  "$select=msmedia_name,bsi_teaminfo,bsi_description,_msmedia_division_value&$expand=msmedia_Division($select=msmedia_name),msmedia_MediaEvent_HomeTeam_msmedia_Sport($select=msmedia_name),msmedia_MediaEvent_VisitingTeam_msmedia_S($select=msmedia_name),bsi_TeamImage($select=bsi_alttext,bsi_cdnurl)";

export const dynamicsSportsPlayersQuery =
  "$select=msmedia_name,bsi_teamrole&$expand=bsi_Contact($select=fullname,emailaddress1),bsi_ProfilePicture($select=bsi_alttext,bsi_cdnurl)";

export const dynamicsOrganizationContactsQuery =
  "$filter=bsi_isorganizationcontact eq true&$select=fullname,emailaddress1,jobtitle&$expand=bsi_ProfilePicture($select=bsi_alttext,bsi_cdnurl)";
