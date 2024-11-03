import { UserRoundIcon } from "lucide-react";

function DefaultUserIcon() {
  return (
    <div className="-mt-10 mb-2 flex aspect-square size-20 items-center justify-center rounded-full bg-slate-200 p-2">
      <UserRoundIcon className="size-12 fill-slate-400 stroke-none" />
    </div>
  );
}

export default DefaultUserIcon;
