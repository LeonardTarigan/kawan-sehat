import useMutateCreatePostComment from "@/hooks/api/posts/useMutateCreatePostComment";
import useQueryPostsComments from "@/hooks/api/posts/useQueryPostComments";
import dayjs from "dayjs";
import { FormEvent, useState } from "react";
import { Input } from "./input";
import { MessageSquareIcon } from "lucide-react";
import PostCommentReply from "./post-comment-reply";
import useQueryPostsCommentReplies from "@/hooks/api/posts/useQueryPostCommentReplies";
import useMutateCreatePostCommentReply from "@/hooks/api/posts/useMutateCreatePostCommentReply";

interface IPostComment {
  id: string;
  created_at: string;
  username: string;
  content: string;
  total_replies: number;
}

export default function PostComment({
  id,
  content,
  created_at,
  total_replies,
  username,
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
      <p className="text-sm text-slate-400">
        <span className="font-medium text-primary-500">@{username}</span> •{" "}
        {dayjs(created_at).fromNow()}
      </p>
      <p>{content}</p>
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
