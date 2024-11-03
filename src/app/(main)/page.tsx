"use client";

import SectionPosts from "@/components/home/section-posts";
import SectionTopics from "@/components/home/section-topics";
import { Button } from "@/components/shared/button";
import SearchIcon from "@/components/shared/icons/search-icon";
import useMounted from "@/hooks/useMounted";
import useUserAccount from "@/hooks/useUserAccount";
import Link from "next/link";

export default function Home() {
  const isMounted = useMounted();
  const user = useUserAccount();

  if (!isMounted) return;

  return (
    <main className="space-y-5 pb-24">
      <section className="flex items-center justify-between gap-10 p-5">
        <div>
          <h2 className="flex items-center gap-2 text-xl font-bold">
            <span className="line-clamp-1">Halo, {user?.username}</span>{" "}
          </h2>
          <p className="text-sm text-slate-400">Gimana kabarmu hari ini?</p>
        </div>
        <Link href={"/search"}>
          <Button
            size={"icon"}
            variant={"secondary"}
            className="rounded-full text-primary-500"
          >
            <SearchIcon className="size-10" />
          </Button>
        </Link>
      </section>
      <SectionTopics />
      <SectionPosts />
    </main>
  );
}
