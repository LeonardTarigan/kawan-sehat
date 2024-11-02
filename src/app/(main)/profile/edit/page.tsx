"use client";

import { Button } from "@/components/shared/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form";
import { Input } from "@/components/shared/input";
import useUserAccount from "@/hooks/useUserAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ChevronLeftIcon } from "lucide-react";

const editProfileFormSchema = z.object({
  full_name: z.string().min(1, { message: "Nama Lengkap tidak boleh kosong" }),
  username: z.string().min(1, { message: "Username tidak boleh kosong" }),
  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .min(1, { message: "Email tidak boleh kosong" }),
  nik: z.string().min(1, { message: "NIK tidak boleh kosong" }),
  gender: z.string().min(1, { message: "Gender tidak boleh kosong" }),
});

type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;

export default function EditProfilePage() {
  const user = useUserAccount();

  const form = useForm<EditProfileFormSchema>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: user,
  });

  return (
    <main className="space-y-10 p-5 pb-32">
      <section>
        <Link href={"/profile"} className="flex items-center gap-1">
          <ChevronLeftIcon />
          <h2 className="text-xl font-semibold">Edit Profil</h2>
        </Link>
      </section>

      <section className="flex flex-col items-center gap-2">
        <div className="mb-5 size-14 overflow-hidden rounded-full bg-primary-200"></div>

        <Form {...form}>
          <form className="flex w-full flex-col gap-2">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} disabled />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nama Lengkap</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="nik"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>NIK</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="mt-10 space-y-1">
              <Button type="submit" className="w-full" disabled>
                Edit Profil
              </Button>
              <Button type="button" className="w-full" variant={"outline"}>
                Verifikasi Sebagai Ahli
              </Button>
              <Button type="button" className="w-full" variant={"outline"}>
                Ubah Password
              </Button>
            </div>
          </form>
        </Form>
      </section>
    </main>
  );
}
