export interface IUserAccount {
  id: string;
  full_name: string;
  username: string;
  nik: string;
  email: string;
  gender: string;
  role: string;
  avatar: string;
}

type UserAvatar =
  | "NONE"
  | "OLD_FEMALE"
  | "OLD_MALE"
  | "YOUNG_FEMALE"
  | "YOUNG_MALE";

type UserGender = "UNSPECIFIED" | "MALE" | "FEMALE";
