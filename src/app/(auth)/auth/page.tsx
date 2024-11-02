import { Button } from "@/components/shared/button";
import Image from "next/image";
import Link from "next/link";

export default function AuthPage() {
  return (
    <main className="flex h-screen flex-col items-center justify-center gap-5 p-5">
      <div className="relative aspect-[3/4] w-full shrink-0">
        <Image src={"/img/auth-image.png"} alt="Illustration" fill priority />
      </div>
      <div className="flex w-full flex-col gap-2">
        <Link href={"/auth/login"}>
          <Button className="w-full">Masuk</Button>
        </Link>
        <Link href={"/auth/register"}>
          <Button className="w-full" variant={"outline"}>
            Daftar
          </Button>
        </Link>
      </div>
    </main>
  );
}
