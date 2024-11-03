"use client";

import useQueryMedicalRecords from "@/hooks/api/medical-record/useQueryMedicalRecords";
import dayjs from "dayjs";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next/link";

export default function MedicalRecordHistory() {
  const { data, isLoading } = useQueryMedicalRecords();

  if (isLoading)
    return (
      <div className="space-y-2 p-5">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="h-20 w-full animate-pulse rounded-xl bg-slate-200"
          ></div>
        ))}
      </div>
    );

  return (
    <main className="space-y-10 p-5">
      <section>
        <Link href={"/profile"} className="flex items-center gap-1">
          <ChevronLeftIcon />
          <h2 className="text-xl font-semibold">Riwayat Penyakit</h2>
        </Link>
      </section>
      <section className="space-y-2">
        {data?.data.map(({ date, illness }, index) => (
          <div
            key={index + illness}
            className="flex items-center justify-between rounded-xl bg-white p-5"
          >
            <p className="font-semibold">{illness}</p>
            <p className="text-sm">{dayjs(date).format("MMMM YYYY")}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
