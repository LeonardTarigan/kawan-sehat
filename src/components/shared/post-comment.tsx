import useMutateCreatePostComment from "@/hooks/api/posts/useMutateCreatePostComment";
import useQueryPostsComments from "@/hooks/api/posts/useQueryPostComments";
import dayjs from "dayjs";
import { FormEvent, useState } from "react";
import { Input } from "./input";

export default function PostComment({ id }: { id: string }) {
  const [comment, setComment] = useState("");

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

  return (
    <div className="mt-3">
      <form onSubmit={handleComment}>
        <Input
          placeholder="Tambahkan komentar"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </form>
      <div className="mt-2 space-y-2">
        {data?.data.comments.map(
          ({ id, content, account, created_at, total_replies, vote }) => (
            <div key={id} className="text-xs">
              <p className="text-sm font-medium">
                @{account.username} • {dayjs(created_at).fromNow()}
              </p>
              <p>{content}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
}
