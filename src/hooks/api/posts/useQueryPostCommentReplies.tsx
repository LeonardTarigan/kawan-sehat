import { getAllPostCommentReplies } from "@/actions/post-service";
import { useQuery } from "@tanstack/react-query";

export default function useQueryPostsCommentReplies(
  id: string,
  query?: Record<string, string>,
) {
  const res = useQuery({
    queryKey: ["replies", id],
    queryFn: async () => {
      const res = await getAllPostCommentReplies(id, query);
      return res;
    },
  });

  return res;
}
