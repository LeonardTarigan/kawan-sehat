import useQueryBookmarks from "@/hooks/api/bookmarks/useQueryBookmarks";
import CardPost from "../shared/card-post";
import AlertError from "../shared/alert-error";
import Image from "next/image";

export default function SectionPosts() {
  const { data, isLoading, isError } = useQueryBookmarks();

  if (isLoading)
    return (
      <div className="space-y-2">
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
      <AlertError
        message="Gagal memuat data bookmark"
        containerClassName="px-5"
      />
    );

  if (!data) return;

  return (
    <>
      {data.data.posts.length === 0 && (
        <section className="flex h-[80dvh] flex-col items-center justify-center gap-2">
          <div className="relative aspect-square w-2/3">
            <Image src={"/img/no-bookmark.png"} alt="User Avatar" fill />
          </div>
          <p className="text-primary-300">Belum ada bookmark</p>
        </section>
      )}
      <section className="space-y-3">
        {data.data.posts.map(
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
    </>
  );
}
