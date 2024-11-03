"use server";

import { IResponse } from "@/model/general-type";
import { IMedicalRecord } from "@/model/medical-record-type";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export async function getAllMedicalRecords(
  query?: Record<string, string>,
): Promise<IResponse<IMedicalRecord[]>> {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(
    baseUrl + `/users/illnesses?${new URLSearchParams(query).toString()}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    },
  );

  if (!res.ok) {
    throw new Error(`Error ${res.status}: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
