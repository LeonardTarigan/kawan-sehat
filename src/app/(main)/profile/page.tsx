"use client";

import { Button } from "@/components/shared/button";
import useMounted from "@/hooks/useMounted";
import useUserAccount from "@/hooks/useUserAccount";
import { ClipboardPlusIcon, LogOutIcon, UserRoundPenIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function ProfilePage() {
  const isMounted = useMounted();
  const router = useRouter();
  const user = useUserAccount();

  if (!isMounted) return;

  const handleLogout = () => {
    Cookies.remove("token");
    Cookies.remove("user");

    router.push("/auth/login");
  };

  return (
    <main>
      <section className="h-32 w-full bg-gradient-to-r from-primary-500 via-primary-400 to-primary-500"></section>

      <div className="space-y-5 px-5">
        <section className="flex justify-between gap-10">
          <div>
            <div className="relative -mt-10 mb-2 size-20">
              <Image src={`/img/${user?.avatar}.png`} alt="User Avatar" fill />
            </div>
            <h2 className="text-xl font-bold">{user?.full_name}</h2>
            <p>{user?.email}</p>
          </div>
          <Button
            onClick={handleLogout}
            className="mt-5"
            size={"icon"}
            variant={"destructive"}
          >
            <LogOutIcon />
          </Button>
        </section>
        <section className="flex gap-1">
          <Link href={"/profile/edit"} className="w-full">
            <Button className="w-full" size={"sm"} variant={"outline"}>
              <UserRoundPenIcon />
              <span>Edit Profil</span>
            </Button>
          </Link>
          <Link href={"/medical-record"} className="w-full">
            <Button className="w-full" size={"sm"} variant={"outline"}>
              <ClipboardPlusIcon />
              <span>Riwayat Penyakit</span>
            </Button>
          </Link>
        </section>
      </div>
    </main>
  );
}
