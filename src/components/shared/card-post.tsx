"use client";

import { Bookmark, MessageSquareIcon } from "lucide-react";
import ArrowDownIcon from "./icons/arrow-down-icon";
import ArrowUpIcon from "./icons/arrow-up-icon";
import { useState, useRef, useEffect } from "react";
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
}: ICardPost) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [contentExceedsLimit, setContentExceedsLimit] = useState(false);
  const contentRef = useRef<HTMLParagraphElement>(null);

  const handleSwitchFullContent = () => setShowFullContent((prev) => !prev);
  const handleSwitchCommentOpen = () => setIsCommentOpen((prev) => !prev);

  const { mutate: createBookmark } = useMutateCreateBookmark();
  const { mutate: votePost } = useMutateVotePost();
  const { mutate: downvotePost } = useMutateDownvotePost();

  useEffect(() => {
    const checkContentHeight = () => {
      if (contentRef.current) {
        const lineHeight = parseInt(
          window.getComputedStyle(contentRef.current).lineHeight,
        );
        const contentHeight = contentRef.current.scrollHeight;
        const fourLinesHeight = lineHeight * 4;

        setContentExceedsLimit(contentHeight > fourLinesHeight);
      }
    };

    checkContentHeight();
    window.addEventListener("resize", checkContentHeight);

    return () => {
      window.removeEventListener("resize", checkContentHeight);
    };
  }, [content]);

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
      <h3 className="text-base font-semibold">{title}</h3>

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
          onClick={() => createBookmark(id)}
          className="rounded-full bg-primary-50 p-1 px-4 transition-colors duration-150 hover:bg-primary-100"
        >
          <Bookmark className="size-4" />
        </button>
      </div>

      {isCommentOpen && (
        <div className="mt-3">
          <AutoExpandingTextarea placeholder="Tambahkan komentar" maxRows={4} />
        </div>
      )}
    </div>
  );
}
