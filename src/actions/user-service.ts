"use server";

import { IResponse } from "@/model/general-type";
import { IEditUserPayload, IUserAccount } from "@/model/user-type";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export async function getUserData(
  id: string,
): Promise<IResponse<IUserAccount>> {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(baseUrl + `/users/${id}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

export async function editUserData(payload: IEditUserPayload) {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(baseUrl + `/users`, {
    method: "PUT",
    body: JSON.stringify(payload),
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
