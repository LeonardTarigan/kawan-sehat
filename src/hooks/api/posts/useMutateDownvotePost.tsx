import { downVotePost, votePost } from "@/actions/post-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useMutateDownvotePost() {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ["downvote-post"],
    mutationFn: async (id: string) => downVotePost(id),
    onSuccess: () => {
      toast.success("Downvote berhasil");
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Gagal melakukan downvote");
    },
  });

  return res;
}
