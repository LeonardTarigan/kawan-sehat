import { IAuthResponse, ILoginPayload } from "@/model/auth-type";
import { IResponse } from "@/model/general-type";
import { ApiClass } from "./client";
import axios from "axios";

class AuthService extends ApiClass {
  public async login(
    payload: ILoginPayload,
  ): Promise<IResponse<IAuthResponse>> {
    const { data } = await axios.post<IResponse<IAuthResponse>>(
      "https://kawan-sehat-backend.onrender.com:443/v1/users/login",
      payload,
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      },
    );

    return data;
  }
}

export const AuthApi = new AuthService();
