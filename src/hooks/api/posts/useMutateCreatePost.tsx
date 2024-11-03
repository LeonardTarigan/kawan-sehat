import { createPost } from "@/actions/post-service";
import { ICreatePostPayload } from "@/model/post-type";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

export default function useMutateCreatePost() {
  const router = useRouter();

  const res = useMutation({
    mutationKey: ["create-post"],
    mutationFn: async (payload: ICreatePostPayload) => createPost(payload),
    onSuccess: () => {
      toast.success("Post berhasil dibuat");
      router.push("/");
    },
    onError: () => {
      toast.error("Post gagal dibuat");
    },
  });

  return res;
}
