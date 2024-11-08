import { IPagination } from "./general-type";
import { UserAvatar, UserRole } from "./user-type";

export type VoteState = -1 | 0 | 1;

export interface IPostAccount {
  id: string;
  username: string;
  avatar: UserAvatar;
  role: UserRole;
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

export interface IPostComment {
  id: string;
  post_id: string;
  account: IPostAccount;
  vote: IPostVote;
  total_replies: number;
  content: string;
  created_at: string;
}

export interface IPostList extends IPagination {
  posts: IPost[];
}

export interface IPostCommentList extends IPagination {
  comments: IPostComment[];
}

export interface IPostCommentReplyList extends IPagination {
  replys: IPostComment[];
}

export interface ICreatePostPayload {
  topic_id: string;
  title: string;
  content: string;
}

export interface ICreateCommentPayload {
  post_id: string;
  content: string;
}

export interface ICreateCommentReplyPayload {
  comment_id: string;
  content: string;
}
