import { getAllBookmarks } from "@/actions/bookmark-service";
import { useQuery } from "@tanstack/react-query";

export default function useQueryBookmarks(query?: Record<string, string>) {
  const res = useQuery({
    queryKey: ["bookmark"],
    queryFn: async () => {
      const res = await getAllBookmarks(query);
      return res;
    },
  });

  return res;
}
