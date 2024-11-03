"use server";

import { IResponse } from "@/model/general-type";
import { ITopicList } from "@/model/topic-type";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export async function getAllTopics(
  query?: Record<string, string>,
): Promise<IResponse<ITopicList>> {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(
    baseUrl + `/topics?${new URLSearchParams(query).toString()}`,
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
