import useQueryPostsCommentReplies from "@/hooks/api/posts/useQueryPostCommentReplies";
import dayjs from "dayjs";
import DefaultUserIcon from "./default-user-icon";
import Image from "next/image";
import { ShieldPlusIcon, WrenchIcon } from "lucide-react";

export default function PostCommentReply({ id }: { id: string }) {
  const { data } = useQueryPostsCommentReplies(id);

  return (
    <div className="mt-2 space-y-2 text-xs">
      {data?.data.replys.map(({ id, account, content, created_at }) => (
        <div key={id} className="flex items-center gap-1">
          <div>
            {account.avatar === "NONE" ? (
              <DefaultUserIcon containerClassName="size-7" />
            ) : (
              <div className="relative size-7">
                <Image src={`/img/${account.avatar}.png`} alt="Avatar" fill />
              </div>
            )}
          </div>
          <div>
            <p className="text-slate-400">
              <div className="flex items-center gap-1">
                <span className="font-medium text-primary-500">
                  @{account.username}
                </span>
                {account.role === "EXPERT" && (
                  <div className="flex items-center gap-1 rounded-full bg-sky-500 px-3 text-[10px] font-medium text-white">
                    <ShieldPlusIcon size={12} />
                    <p>Expert</p>
                  </div>
                )}
                {account.role === "ADMIN" && (
                  <div className="flex items-center gap-1 rounded-full bg-emerald-500 px-3 text-[10px] font-medium text-white">
                    <WrenchIcon size={12} />
                    <p>Mod</p>
                  </div>
                )}
              </div>
              <p>{dayjs(created_at).fromNow()}</p>
            </p>
            <p>{content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
