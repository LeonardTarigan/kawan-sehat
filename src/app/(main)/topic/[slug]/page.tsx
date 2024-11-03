"use client";

import CardPost from "@/components/shared/card-post";
import useQueryPosts from "@/hooks/api/posts/useQueryPosts";
import useQueryTopicById from "@/hooks/api/topics/useQueryTopicById";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useMemo } from "react";

export default function TopicPage() {
  const param = useParams();

  const { data } = useQueryTopicById(param.slug as string);
  const { data: postData } = useQueryPosts();

  const filteredData = useMemo(
    () =>
      postData?.data.posts.filter(({ topic }) => {
        console.log(topic.id, param.slug);
        return topic.id === param.slug;
      }),
    [postData],
  );

  return (
    <main className="p-5">
      <section className="rounded-xl bg-white p-5">
        <h2 className="text-xl font-bold">{data?.data.name}</h2>
        <p>{data?.data.description}</p>
      </section>
      <section className="mt-10 space-y-3">
        {filteredData?.length === 0 && (
          <div className="flex w-full flex-col items-center gap-2 py-20">
            <div className="relative aspect-square w-1/2">
              <Image src={"/img/no-bookmark.png"} alt="Illustration" fill />
            </div>
            <p className="text-primary-400">Belum ada post dengan topik ini</p>
          </div>
        )}
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
              role={account.role}
            />
          ),
        )}
      </section>
    </main>
  );
}
