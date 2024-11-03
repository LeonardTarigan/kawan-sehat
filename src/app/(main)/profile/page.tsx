"use client";

import { Button } from "@/components/shared/button";
import CardPost from "@/components/shared/card-post";
import DefaultUserIcon from "@/components/shared/default-user-icon";
import useQueryPosts from "@/hooks/api/posts/useQueryPosts";
import useMounted from "@/hooks/useMounted";
import useUserAccount from "@/hooks/useUserAccount";
import Cookies from "js-cookie";
import { ClipboardPlusIcon, LogOutIcon, UserRoundPenIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const isMounted = useMounted();
  const router = useRouter();
  const user = useUserAccount();

  const { data } = useQueryPosts({ account_id: user?.id! });

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    router.push("/auth/login");
  };

  if (!isMounted) return;

  return (
    <main className="pb-32">
      <section className="h-32 w-full bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500"></section>

      <div className="space-y-5 px-5">
        <section className="flex justify-between gap-10">
          <div>
            {user?.avatar === "NONE" ? (
              <DefaultUserIcon containerClassName="size-20 -mt-10" />
            ) : (
              <div className="relative -mt-10 mb-2 size-20">
                <Image
                  src={`/img/${user?.avatar}.png`}
                  alt="User Avatar"
                  fill
                />
              </div>
            )}
            <h2 className="line-clamp-1 text-xl font-bold">{user?.username}</h2>
            <p>{user?.email}</p>
          </div>
          <Button
            onClick={handleLogout}
            className="mt-5"
            size={"icon"}
            variant={"destructive"}
          >
            <LogOutIcon />
          </Button>
        </section>
        <section className="flex gap-1">
          <Link href={"/profile/edit"} className="w-full">
            <Button className="w-full" size={"sm"} variant={"outline"}>
              <UserRoundPenIcon />
              <span>Edit Profil</span>
            </Button>
          </Link>
          <Link href={"/medical-record"} className="w-full">
            <Button className="w-full" size={"sm"} variant={"outline"}>
              <ClipboardPlusIcon />
              <span>Riwayat Penyakit</span>
            </Button>
          </Link>
        </section>
        {data?.data.posts.length === 0 && (
          <div className="flex w-full flex-col items-center justify-center gap-2 pt-10">
            <div className="relative aspect-square w-2/3">
              <Image src={"/img/no-post.png"} alt="User Avatar" fill />
            </div>
            <p className="text-primary-300">Belum ada postingan</p>
          </div>
        )}
        <section className="mt-5 space-y-2">
          {data?.data.posts.map(
            ({
              id,
              title,
              account,
              content,
              total_comments,
              vote,
              topic,
              created_at,
              is_bookmarked,
            }) => (
              <CardPost
                key={id}
                title={title}
                id={id}
                username={account.username}
                content={content}
                total_comment={total_comments}
                topic_name={topic.name}
                created_at={created_at}
                vote_total={vote.total}
                vote_status={vote.state}
                avatar={account.avatar}
                is_bookmarked={is_bookmarked}
              />
            ),
          )}
        </section>
      </div>
    </main>
  );
}
