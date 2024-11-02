import { IUserAccount } from "@/model/auth-type";
import Cookie from "js-cookie";

export default function useUserAccount() {
  const account = Cookie.get("account");
  const accountJson: IUserAccount | undefined = account
    ? JSON.parse(account)
    : undefined;

  return accountJson;
}
