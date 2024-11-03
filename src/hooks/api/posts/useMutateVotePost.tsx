import { votePost } from "@/actions/post-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useMutateVotePost() {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ["vote-post"],
    mutationFn: async (id: string) => votePost(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Gagal melakukan vote");
    },
  });

  return res;
}
