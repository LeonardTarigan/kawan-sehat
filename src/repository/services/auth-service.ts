import {
  IAuthResponse,
  ILoginPayload,
  IRegisterPayload,
} from "@/model/auth-type";
import { IResponse } from "@/model/general-type";
import { ApiClass } from "../client";
import { IUserAccount } from "@/model/user-type";

class AuthService extends ApiClass {
  public async login(
    payload: ILoginPayload,
  ): Promise<IResponse<IAuthResponse>> {
    const { data } = await this.axiosInstance.post<IResponse<IAuthResponse>>(
      "/users/login",
      payload,
    );

    return data;
  }

  public async register(
    payload: IRegisterPayload,
  ): Promise<IResponse<IUserAccount>> {
    const { data } = await this.axiosInstance.post<IResponse<IUserAccount>>(
      "/users/register",
      payload,
    );

    return data;
  }
}

export const AuthApi = new AuthService();
