import { cn } from "@/lib/utils";

export default function AlertError({
  message,
  containerClassName,
}: {
  message: string;
  containerClassName?: string;
}) {
  return (
    <div className={containerClassName}>
      <div className="bg-error-100 text-error-500 rounded-lg px-5 py-2 text-sm font-medium">
        {message}
      </div>
    </div>
  );
}
