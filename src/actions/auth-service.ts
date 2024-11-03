"use server";

import {
  IAuthResponse,
  ILoginPayload,
  IRegisterPayload,
} from "@/model/auth-type";
import { IResponse } from "@/model/general-type";
import { IUserAccount } from "@/model/user-type";

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export async function login(
  payload: ILoginPayload,
): Promise<IResponse<IAuthResponse>> {
  const res = await fetch(baseUrl + `/users/login`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

export async function register(
  payload: IRegisterPayload,
): Promise<IResponse<IUserAccount>> {
  const res = await fetch(baseUrl + `/users/register`, {
    method: "POST",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
