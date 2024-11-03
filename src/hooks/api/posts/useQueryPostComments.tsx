import { getAllPostComments, getAllPosts } from "@/actions/post-service";
import { useQuery } from "@tanstack/react-query";

export default function useQueryPostsComments(
  id: string,
  query?: Record<string, string>,
) {
  const res = useQuery({
    queryKey: ["comments", id],
    queryFn: async () => {
      const res = await getAllPostComments(id, query);
      return res;
    },
  });

  return res;
}
