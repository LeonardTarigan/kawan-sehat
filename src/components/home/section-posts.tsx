import useQueryPosts from "@/hooks/api/posts/useQueryPosts";
import CardPost from "../shared/card-post";
import AlertError from "../shared/alert-error";

export default function SectionPosts() {
  const { data, isLoading, isError } = useQueryPosts();

  if (isLoading)
    return (
      <div className="space-y-2 px-5">
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
    <section className="space-y-3 px-5">
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
        }) => (
          <CardPost
            key={id}
            title={title}
            username={account.username}
            content={content}
            total_comment={total_comments}
            topic_name={topic.name}
            created_at={created_at}
          />
        ),
      )}
    </section>
  );
}
