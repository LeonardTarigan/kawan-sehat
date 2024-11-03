import { createPost } from "@/actions/topic-service";
import { ICreatePostPayload } from "@/model/post-type";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useMutateCreatePost() {
  const res = useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (payload: ICreatePostPayload) => createPost(payload),
    onSuccess: () => {
      toast.success("Post berhasil dibuat");
    },
    onError: () => {
      toast.error("Post gagal dibuat");
    },
  });

  return res;
}
