import { deletePostBookmark } from "@/actions/post-service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useMutateDeleteBookmark() {
  const queryClient = useQueryClient();

  const res = useMutation({
    mutationKey: ["delete-bookmark"],
    mutationFn: async (id: string) => deletePostBookmark(id),
    onSuccess: () => {
      toast.success("Bookmark berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["bookmarks"] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      toast.error("Bookmark gagal dihapus");
    },
  });

  return res;
}
