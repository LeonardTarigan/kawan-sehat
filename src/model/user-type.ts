export type UserAvatar =
  | "NONE"
  | "OLD_FEMALE"
  | "OLD_MALE"
  | "YOUNG_FEMALE"
  | "YOUNG_MALE";

export type UserGender = "UNSPECIFIED" | "MALE" | "FEMALE";

export type UserRole = "PATIENT" | "EXPERT" | "ADMIN";

export interface IUserAccount {
  id: string;
  full_name: string;
  username: string;
  nik: string;
  email: string;
  gender: UserGender;
  role: UserRole;
  avatar: UserAvatar;
}

export interface IEditUserPayload {
  full_name?: string;
  username?: string;
  nik?: string;
  gender?: string;
  avatar?: string;
}
