import { Entity } from "dataverse-webapi/lib/node";

export interface Contact extends Entity {
  contactid: string;
  fullname: string;
  emailaddress1: string;
  bsi_username: string;
  bsi_password: string;
}

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  username: string;
  password: string;
};

export type CurrentUser = {
  fullname: string;
  email: string;
  username: string;
  id: string;
};
