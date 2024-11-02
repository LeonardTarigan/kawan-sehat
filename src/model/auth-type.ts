import { IUserAccount } from "./user-type";

export interface IAuthResponse {
  account: IUserAccount;
  token: string;
}

export interface ILoginPayload {
  username: string;
  password: string;
}

export interface IRegisterPayload {
  username: string;
  email: string;
  password: string;
}
