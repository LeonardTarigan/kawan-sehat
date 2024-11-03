import { createPostBookmark } from "@/actions/post-service";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useMutateCreateBookmark() {
  const res = useMutation({
    mutationKey: ["create-bookmark"],
    mutationFn: async (id: string) => createPostBookmark(id),
    onSuccess: () => {
      toast.success("Post berhasil disimpan");
    },
    onError: () => {
      toast.error("Post gagal disimpan");
    },
  });

  return res;
}
