import { IPagination } from "./general-type";
import { UserAvatar } from "./user-type";

export type VoteState = -1 | 0 | 1;

export interface IPostAccount {
  id: string;
  username: string;
  avatar: UserAvatar;
}

export interface IPostTopic {
  id: string;
  name: string;
}

export interface IPostVote {
  total: number;
  state: VoteState;
}

export interface IPost {
  id: string;
  account: IPostAccount;
  topic: IPostTopic;
  vote: IPostVote;
  total_comments: number;
  title: string;
  content: string;
  is_bookmarked: boolean;
  created_at: string;
}

export interface IPostList extends IPagination {
  posts: IPost[];
}

export interface ICreatePostPayload {
  topic_id: string;
  title: string;
  content: string;
}
