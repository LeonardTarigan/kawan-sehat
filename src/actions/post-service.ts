"use server";

import { IResponse } from "@/model/general-type";
import {
  ICreateCommentPayload,
  ICreatePostPayload,
  IPostCommentList,
  IPostList,
} from "@/model/post-type";
import { cookies } from "next/headers";

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export async function getAllPosts(
  query?: Record<string, string>,
): Promise<IResponse<IPostList>> {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(
    baseUrl + `/posts?${new URLSearchParams(query).toString()}`,
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

export async function createPost(payload: ICreatePostPayload) {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(baseUrl + "/posts", {
    method: "POST",
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

export async function createPostBookmark(id: string) {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(baseUrl + `/posts/${id}/mark`, {
    method: "POST",
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

export async function deletePostBookmark(id: string) {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(baseUrl + `/posts/${id}/unmark`, {
    method: "DELETE",
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

export async function votePost(id: string) {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(baseUrl + `/posts/${id}/upvote`, {
    method: "POST",
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

export async function downVotePost(id: string) {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(baseUrl + `/posts/${id}/downvote`, {
    method: "POST",
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

export async function getAllPostComments(
  id: string,
  query?: Record<string, string>,
): Promise<IResponse<IPostCommentList>> {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(
    baseUrl + `/posts/${id}/comments?${new URLSearchParams(query).toString()}`,
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

export async function createPostComment(payload: ICreateCommentPayload) {
  const token = (await cookies()).get("token")?.value;

  const res = await fetch(baseUrl + "/comments", {
    method: "POST",
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
