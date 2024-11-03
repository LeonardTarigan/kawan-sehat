import { cn } from "@/lib/utils";
import { UserRoundIcon } from "lucide-react";

function DefaultUserIcon({
  containerClassName,
  className,
}: {
  containerClassName?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-2 flex aspect-square size-10 items-center justify-center rounded-full bg-slate-200 p-2",
        containerClassName,
      )}
    >
      <UserRoundIcon
        className={cn("size-12 fill-slate-400 stroke-none", className)}
      />
    </div>
  );
}

export default DefaultUserIcon;
