export interface IUserAccount {
  id: string;
  full_name: string;
  username: string;
  nik: string;
  email: string;
  gender: string;
  role: string;
  avatar: string;
}

export interface IAuthResponse {
  account: IUserAccount;
  token: string;
}

export interface ILoginPayload {
  username: string;
  password: string;
}
