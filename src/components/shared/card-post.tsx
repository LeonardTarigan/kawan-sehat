"use client";

import { Bookmark, MessageSquareIcon } from "lucide-react";
import ArrowDownIcon from "./icons/arrow-down-icon";
import ArrowUpIcon from "./icons/arrow-up-icon";
import { useState, useRef, useEffect, FormEvent } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import AutoExpandingTextarea from "./auto-expanding-textarea";
import useMutateCreateBookmark from "@/hooks/api/bookmarks/useMutateCreateBookmark";
import useMutateVotePost from "@/hooks/api/posts/useMutateVotePost";
import useMutateDownvotePost from "@/hooks/api/posts/useMutateDownvotePost";
import { Button } from "./button";
import { UserAvatar } from "@/model/user-type";
import DefaultUserIcon from "./default-user-icon";
import Image from "next/image";
import useLineLimit from "@/hooks/useLineLimit";
import useMutateDeleteBookmark from "@/hooks/api/bookmarks/useMutateDeleteBookmark";
import useQueryPostsComments from "@/hooks/api/posts/useQueryPostComments";
import PostComment from "./post-comment";
import useMutateCreatePostComment from "@/hooks/api/posts/useMutateCreatePostComment";
import { Input } from "./input";

dayjs.extend(relativeTime);
dayjs.locale("id");

interface ICardPost {
  id: string;
  title: string;
  username: string;
  content: string;
  total_comment: number;
  topic_name: string;
  created_at: string;
  vote_total: number;
  vote_status: number;
  avatar: UserAvatar;
  is_bookmarked: boolean;
}

export default function CardPost({
  id,
  title,
  content,
  username,
  topic_name,
  total_comment,
  created_at,
  vote_total,
  vote_status,
  avatar,
  is_bookmarked,
}: ICardPost) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [comment, setComment] = useState("");

  const handleSwitchFullContent = () => setShowFullContent((prev) => !prev);
  const handleSwitchCommentOpen = () => setIsCommentOpen((prev) => !prev);

  const { mutate: createBookmark } = useMutateCreateBookmark();
  const { mutate: deleteBookmark } = useMutateDeleteBookmark();
  const { mutate: votePost } = useMutateVotePost();
  const { mutate: downvotePost } = useMutateDownvotePost();

  const { data } = useQueryPostsComments(id);
  const { mutate } = useMutateCreatePostComment(id);

  const handleComment = (e: FormEvent) => {
    e.preventDefault();
    mutate({
      post_id: id,
      content: comment,
    });
    setComment("");
  };

  const { contentExceedsLimit, contentRef } = useLineLimit(content);

  const handleBookmark = () =>
    is_bookmarked ? deleteBookmark(id) : createBookmark(id);

  return (
    <div className="rounded-xl bg-white p-5 text-sm">
      <div className="flex gap-2">
        {avatar === "NONE" ? (
          <DefaultUserIcon containerClassName="" />
        ) : (
          <div className="relative mb-2 size-10">
            <Image src={`/img/${avatar}.png`} alt="User Avatar" fill />
          </div>
        )}
        <div>
          <p className="text-base font-medium text-primary-500">@{username}</p>
          <div className="text-slate-400">
            {topic_name} • {dayjs(created_at).fromNow()}
          </div>
        </div>
      </div>
      <h3 className="text-base font-semibold leading-tight">{title}</h3>

      <p
        ref={contentRef}
        className={`mt-2 ${!showFullContent && contentExceedsLimit ? "line-clamp-4" : ""}`}
      >
        {content}
      </p>
      {contentExceedsLimit && (
        <Button
          onClick={handleSwitchFullContent}
          variant="link"
          size="sm"
          className="px-0 text-sm font-normal text-slate-400"
        >
          Lihat {showFullContent ? "lebih sedikit" : "selengkapnya"}
        </Button>
      )}

      <div className="mt-5 flex items-center gap-2 text-primary-500">
        <div className="flex w-fit items-center gap-1 overflow-hidden rounded-full bg-primary-50">
          <button
            disabled={vote_status === 1}
            onClick={() => votePost(id)}
            className={`px-2 py-1 transition-colors duration-150 ${
              vote_status === 1
                ? "text-success-500 bg-success-100 enabled:hover:bg-success-200"
                : "hover:bg-primary-100"
            }`}
          >
            <ArrowUpIcon className="size-4" />
          </button>
          <div className="p-1">{vote_total}</div>
          <button
            disabled={vote_status === -1}
            onClick={() => downvotePost(id)}
            className={`px-2 py-1 transition-colors duration-150 ${
              vote_status === -1
                ? "text-error-500 bg-error-100 enabled:hover:bg-error-200"
                : "hover:bg-primary-100"
            }`}
          >
            <ArrowDownIcon className="size-4" />
          </button>
        </div>
        <button
          onClick={handleSwitchCommentOpen}
          className="flex items-center justify-center gap-1 rounded-full bg-primary-50 px-4 py-1 transition-colors duration-150 hover:bg-primary-100"
        >
          <MessageSquareIcon className="size-4" />
          <span>{total_comment}</span>
        </button>
        <button
          onClick={handleBookmark}
          className="rounded-full bg-primary-50 p-1 px-4 transition-colors duration-150 hover:bg-primary-100"
        >
          <Bookmark
            className={`size-4 ${is_bookmarked && "fill-primary-500"}`}
          />
        </button>
      </div>

      {isCommentOpen && (
        <div className="mt-3">
          <form onSubmit={handleComment}>
            <Input
              placeholder="Tambahkan komentar"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </form>
          <div className="mt-2 space-y-3">
            {data?.data.comments.map(
              ({ id, content, account, created_at, total_replies, vote }) => (
                <PostComment
                  key={id}
                  id={id}
                  content={content}
                  username={account.username}
                  created_at={created_at}
                  total_replies={total_replies}
                />
              ),
            )}
          </div>
        </div>
      )}
    </div>
  );
}
