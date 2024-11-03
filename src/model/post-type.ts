import { IPagination } from "./general-type";

export interface IPostAccount {
  id: string;
  username: string;
}

export interface IPostTopic {
  id: string;
  name: string;
}

export interface IPostVote {
  total: number;
  state: number;
}

export interface IPost {
  id: string;
  account: IPostAccount;
  topic: IPostTopic;
  vote: IPostVote;
  total_comments: number;
  title: string;
  content: string;
  created_at: string;
}

export interface IPostList extends IPagination {
  posts: IPost[];
}
