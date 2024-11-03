import { getTopicById } from "@/actions/topic-service";
import { useQuery } from "@tanstack/react-query";

export default function useQueryTopicById(id: string) {
  const res = useQuery({
    queryKey: ["topics-detail"],
    queryFn: async () => {
      const res = await getTopicById(id);
      return res;
    },
  });

  return res;
}
