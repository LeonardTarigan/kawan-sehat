import useMutateCreatePostComment from "@/hooks/api/posts/useMutateCreatePostComment";
import useQueryPostsComments from "@/hooks/api/posts/useQueryPostComments";
import dayjs from "dayjs";
import { FormEvent, useState } from "react";
import { Input } from "./input";
import { MessageSquareIcon, ShieldPlusIcon, WrenchIcon } from "lucide-react";
import PostCommentReply from "./post-comment-reply";
import useQueryPostsCommentReplies from "@/hooks/api/posts/useQueryPostCommentReplies";
import useMutateCreatePostCommentReply from "@/hooks/api/posts/useMutateCreatePostCommentReply";
import { UserAvatar, UserRole } from "@/model/user-type";
import Image from "next/image";
import DefaultUserIcon from "./default-user-icon";

interface IPostComment {
  id: string;
  created_at: string;
  username: string;
  content: string;
  total_replies: number;
  role: UserRole;
  avatar: UserAvatar;
}

export default function PostComment({
  id,
  content,
  created_at,
  total_replies,
  username,
  role,
  avatar,
}: IPostComment) {
  const [showReplies, setShowReplies] = useState(false);
  const [comment, setComment] = useState("");

  const handleSwitchReplyOpen = () => setShowReplies((prev) => !prev);

  const { mutate } = useMutateCreatePostCommentReply(id);

  const handleComment = (e: FormEvent) => {
    e.preventDefault();
    mutate({
      comment_id: id,
      content: comment,
    });
    setComment("");
  };

  return (
    <div key={id} className="text-xs">
      <div className="flex items-center gap-2">
        {avatar === "NONE" ? (
          <DefaultUserIcon containerClassName="size-7" />
        ) : (
          <div className="relative size-7">
            <Image src={`/img/${avatar}.png`} alt="Avatar" fill />
          </div>
        )}
        <div className="flex flex-col text-sm text-slate-400">
          <div className="flex items-center gap-1">
            <span className="font-medium text-primary-500">@{username}</span>
            {role === "EXPERT" && (
              <div className="flex items-center gap-1 rounded-full bg-sky-500 px-3 text-[10px] font-medium text-white">
                <ShieldPlusIcon size={15} />
                <p>Expert</p>
              </div>
            )}
            {role === "ADMIN" && (
              <div className="flex items-center gap-1 rounded-full bg-emerald-500 px-3 text-[10px] font-medium text-white">
                <WrenchIcon size={12} />
                <p>Mod</p>
              </div>
            )}
          </div>
          <div className="text-xs">{dayjs(created_at).fromNow()}</div>
        </div>
      </div>
      <p className="mt-2">{content}</p>
      <div className="mt-2">
        <button
          onClick={handleSwitchReplyOpen}
          className="flex items-center justify-center gap-1 text-slate-400 transition-colors duration-150"
        >
          <MessageSquareIcon className="size-3" />
          <span>{total_replies} Balasan</span>
        </button>
      </div>
      {showReplies && (
        <div className="ml-2 mt-2 border-l pl-2">
          <form onSubmit={handleComment}>
            <Input
              placeholder="Tambahkan balasan"
              className="h-fit py-2 text-xs"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />
          </form>
          <PostCommentReply id={id} />
        </div>
      )}
    </div>
  );
}
