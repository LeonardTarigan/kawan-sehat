"use client";

import Link from "next/link";
import HomeIcon from "./icons/home-icon";
import BookmarkIcon from "./icons/bookmark-icon";
import AddCircleIcon from "./icons/add-circle-icon";
import NotificationIcon from "./icons/notification-icon";
import ProfileIcon from "./icons/profile-icon";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="text-primary-200 fixed bottom-0 flex w-full max-w-md justify-between bg-white px-5 py-2">
      <Link
        href={"/"}
        className={`py-1 ${pathname === "/" && "text-primary-500"}`}
      >
        <HomeIcon className="size-7" />
      </Link>
      <Link
        href={"/bookmarks"}
        className={`py-1 ${pathname === "/bookmarks" && "text-primary-500"}`}
      >
        <BookmarkIcon className="size-7" />
      </Link>
      <Link href={"/add-post"} className="relative flex size-7 justify-center">
        <AddCircleIcon className="absolute -top-10 size-14" />
      </Link>
      <Link
        href={"/notifications"}
        className={`py-1 ${pathname === "/notifications" && "text-primary-500"}`}
      >
        <NotificationIcon className="size-7" />
      </Link>
      <Link
        href={"/profile"}
        className={`py-1 ${pathname === "/profile" && "text-primary-500"}`}
      >
        <ProfileIcon className="size-7" />
      </Link>
    </nav>
  );
}
