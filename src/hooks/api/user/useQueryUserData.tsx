import { getUserData } from "@/actions/user-service";
import { useQuery } from "@tanstack/react-query";

export default function useQueryUserData(id: string) {
  const res = useQuery({
    queryKey: ["user-data"],
    queryFn: async () => {
      const res = await getUserData(id);
      return res;
    },
  });

  return res;
}
