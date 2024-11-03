import { getAllTopics } from "@/actions/topic-service";
import { useQuery } from "@tanstack/react-query";

export default function useQueryTopics() {
  const res = useQuery({
    queryKey: ["topics"],
    queryFn: async () => {
      const res = await getAllTopics();
      return res;
    },
  });

  return res;
}
