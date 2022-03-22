import { IronSessionData } from "iron-session";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: string;
      fullname: string;
      email: string;
      username: string;
    };
  }
}
