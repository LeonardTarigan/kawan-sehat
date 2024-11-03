"use client";

import { Bookmark, MessageSquareIcon } from "lucide-react";
import ArrowDownIcon from "./icons/arrow-down-icon";
import ArrowUpIcon from "./icons/arrow-up-icon";
import { Button } from "./button";
import { useState } from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/id";
import { Input } from "./input";
import { Textarea } from "./textarea";
import AutoExpandingTextarea from "./auto-expanding-textarea";
import useMutateCreateBookmark from "@/hooks/api/bookmarks/useMutateCreateBookmark";

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
}

export default function CardPost({
  id,
  title,
  content,
  username,
  topic_name,
  total_comment,
  created_at,
}: ICardPost) {
  const [showFullContent, setShowFullContent] = useState(false);
  const [isCommentOpen, setIsCommentOpen] = useState(false);

  const handleSwitchFullContent = () => setShowFullContent((prev) => !prev);
  const handleSwitchCommentOpen = () => setIsCommentOpen((prev) => !prev);

  const { mutate } = useMutateCreateBookmark();

  return (
    <div className="rounded-xl bg-white p-5 text-sm">
      <p className="text-base font-medium text-primary-500">@{username}</p>
      <div className="text-slate-400">
        {topic_name} • {dayjs(created_at).fromNow()}
      </div>
      <h3 className="text-base font-semibold">{title}</h3>

      <p className={`mt-2 ${!showFullContent && "line-clamp-4"}`}>{content}</p>
      <Button
        onClick={handleSwitchFullContent}
        variant={"link"}
        size={"sm"}
        className="px-0 text-sm font-normal text-slate-400"
      >
        Lihat {showFullContent ? "lebih sedikit" : "selengkapnya"}
      </Button>

      <div className="mt-5 flex items-center gap-2 text-primary-500">
        <div className="flex w-fit items-center gap-1 overflow-hidden rounded-full bg-primary-50">
          <button className="px-2 py-1 transition-colors duration-150 hover:bg-primary-100">
            <ArrowUpIcon className="size-4" />
          </button>
          <div className="py-1">0</div>
          <button className="px-2 py-1 transition-colors duration-150 hover:bg-primary-100">
            <ArrowDownIcon className="size-4" />
          </button>
        </div>
        <button
          onClick={handleSwitchCommentOpen}
          className="flex items-center justify-center gap-1 rounded-full bg-primary-50 px-4 py-1"
        >
          <MessageSquareIcon className="size-4" />
          <span>{total_comment}</span>
        </button>
        <button
          onClick={() => mutate(id)}
          className="rounded-full bg-primary-50 p-1 px-4"
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
