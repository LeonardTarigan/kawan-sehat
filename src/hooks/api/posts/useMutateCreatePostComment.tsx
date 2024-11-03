import { createPostComment } from "@/actions/post-service";
import { ICreateCommentPayload } from "@/model/post-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutateCreatePostComment(id: string) {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ["create-post-comment"],
    mutationFn: async (payload: ICreateCommentPayload) =>
      createPostComment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });

  return res;
}
