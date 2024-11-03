import { editUserData } from "@/actions/user-service";
import { IEditUserPayload } from "@/model/user-type";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

export default function useMutateEditUserData() {
  const res = useMutation({
    mutationKey: ["edit-user-data"],
    mutationFn: async (payload: IEditUserPayload) => editUserData(payload),
    onSuccess: (data) => {
      Cookies.set("user", JSON.stringify(data.data));
      toast.success("Profil berhasil diubah");
    },
    onError: () => {
      toast.error("Profil gagal diubah");
    },
  });

  return res;
}
