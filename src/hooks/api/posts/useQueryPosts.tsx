import { getAllPosts } from "@/actions/post-service";
import { useQuery } from "@tanstack/react-query";

export default function useQueryPosts(query?: Record<string, string>) {
  const res = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await getAllPosts(query);
      return res;
    },
  });

  return res;
}
