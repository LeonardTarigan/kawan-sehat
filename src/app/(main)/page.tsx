import { Button } from "@/components/shared/button";
import CardPost from "@/components/shared/card-post";
import SearchIcon from "@/components/shared/icons/search-icon";
import Link from "next/link";

export default function Home() {
  return (
    <main className="space-y-5 pb-24">
      <section className="flex items-center justify-between gap-5 p-5">
        <div>
          <h2 className="text-2xl font-bold">Hello Agus 👋</h2>
          <p className="text-slate-400">Gimana kabarmu hari ini ?</p>
        </div>
        <Link href={"/search"}>
          <Button
            size={"icon"}
            variant={"secondary"}
            className="text-primary-500 rounded-full"
          >
            <SearchIcon className="size-10" />
          </Button>
        </Link>
      </section>
      <section className="flex w-full gap-5 overflow-scroll">
        {[...Array(10)].map((_, index) => (
          <div
            key={index}
            className={`rounded-full bg-white px-5 py-2 ${index === 0 && "ml-5"}`}
          >
            Insomnia
          </div>
        ))}
      </section>
      <section className="space-y-3 px-5">
        {[...Array(20)].map((_, index) => (
          <CardPost key={index} />
        ))}
      </section>
    </main>
  );
}
