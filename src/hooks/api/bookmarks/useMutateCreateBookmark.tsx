import { createPostBookmark } from "@/actions/post-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useMutateCreateBookmark() {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ["create-bookmark"],
    mutationFn: async (id: string) => createPostBookmark(id),
    onSuccess: () => {
      toast.success("Post berhasil disimpan");
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Post gagal disimpan");
    },
  });

  return res;
}
