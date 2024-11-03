import { createPostCommentReply } from "@/actions/post-service";
import { ICreateCommentReplyPayload } from "@/model/post-type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useMutateCreatePostCommentReply(id: string) {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ["create-post-comment-reply"],
    mutationFn: async (payload: ICreateCommentReplyPayload) =>
      createPostCommentReply(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["replies", id] });
      queryClient.invalidateQueries({ queryKey: ["comments"] });
    },
  });

  return res;
}
