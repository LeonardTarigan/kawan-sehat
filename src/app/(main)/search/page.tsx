"use client";

import AlertError from "@/components/shared/alert-error";
import CardPost from "@/components/shared/card-post";
import SearchIcon from "@/components/shared/icons/search-icon";
import { Input } from "@/components/shared/input";
import useQueryPosts from "@/hooks/api/posts/useQueryPosts";
import { useMemo, useState } from "react";

export default function SearchPage() {
  const { data, isLoading, isError } = useQueryPosts();

  const [search, setSearch] = useState("");

  const filteredData = useMemo(
    () =>
      data?.data.posts.filter(
        ({ content, title }) =>
          content.toLowerCase().includes(search.toLocaleLowerCase()) ||
          title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      ),
    [data, search],
  );

  if (isLoading)
    return (
      <div className="space-y-2 p-5 pb-24">
        <div className="pb-5">
          <div className="h-10 w-full animate-pulse rounded-full bg-slate-200"></div>
        </div>
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="aspect-video w-full animate-pulse rounded-xl bg-slate-200"
          ></div>
        ))}
      </div>
    );

  if (isError)
    return (
      <AlertError message="Gagal memuat data post" containerClassName="px-5" />
    );

  if (!data) return;

  return (
    <main className="space-y-5 p-5">
      <div className="relative w-full max-w-xl">
        <SearchIcon className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-primary-500" />
        <Input
          type="search"
          placeholder="Cari postingan"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-full border-none bg-white py-6 pl-10 text-sm shadow-sm"
        />
      </div>
      <section className="space-y-3">
        {filteredData?.map(
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
    </main>
  );
}
