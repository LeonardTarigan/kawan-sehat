import useQueryPostsCommentReplies from "@/hooks/api/posts/useQueryPostCommentReplies";
import dayjs from "dayjs";

export default function PostCommentReply({ id }: { id: string }) {
  const { data } = useQueryPostsCommentReplies(id);

  return (
    <div className="mt-2 space-y-1 text-xs">
      {data?.data.replys.map(({ id, account, content, created_at }) => (
        <div key={id}>
          <p className="text-slate-400">
            <span className="font-medium text-primary-500">
              @{account.username}
            </span>{" "}
            • {dayjs(created_at).fromNow()}
          </p>
          <p>{content}</p>
        </div>
      ))}
    </div>
  );
}
