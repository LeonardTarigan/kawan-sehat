import Image from "next/image";

export default function NotificationsPage() {
  return (
    <main className="flex h-screen w-full flex-col items-center justify-center gap-2">
      <div className="relative aspect-square w-1/2">
        <Image src={"/img/no-notification.png"} alt="Illustration" fill />
      </div>
      <p className="text-primary-400">Belum ada notifikasi</p>
    </main>
  );
}
