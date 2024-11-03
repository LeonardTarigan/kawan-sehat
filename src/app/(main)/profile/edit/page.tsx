"use client";

import AlertError from "@/components/shared/alert-error";
import { Button } from "@/components/shared/button";
import DefaultUserIcon from "@/components/shared/default-user-icon";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/shared/form";
import { Input } from "@/components/shared/input";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import useMutateEditUserData from "@/hooks/api/user/useMutateEditUserData";
import useQueryUserData from "@/hooks/api/user/useQueryUserData";
import useUserAccount from "@/hooks/useUserAccount";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectItem } from "@radix-ui/react-select";
import Cookies from "js-cookie";
import { ChevronLeftIcon, Edit2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { z } from "zod";

const editProfileFormSchema = z.object({
  full_name: z.string().min(1, { message: "Nama Lengkap tidak boleh kosong" }),
  username: z.string().min(1, { message: "Username tidak boleh kosong" }),
  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .min(1, { message: "Email tidak boleh kosong" }),
  nik: z
    .string()
    .min(16, { message: "NIK harus 16 digit" })
    .max(16, { message: "NIK harus 16 digit" }),
  gender: z.string().min(1, { message: "Gender tidak boleh kosong" }),
  avatar: z.string().min(1, { message: "Avatar tidak boleh kosong" }),
});

type EditProfileFormSchema = z.infer<typeof editProfileFormSchema>;

export default function EditProfilePage() {
  const user = useUserAccount();

  const { data, isLoading, isError, refetch } = useQueryUserData(user?.id!);
  const { mutate } = useMutateEditUserData();

  const form = useForm<EditProfileFormSchema>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: data?.data || user,
  });

  async function onSubmit({
    avatar,
    full_name,
    gender,
    nik,
  }: EditProfileFormSchema) {
    mutate(
      { avatar, full_name, gender, nik },
      {
        onSuccess: () => {
          refetch();
          form.reset(JSON.parse(Cookies.get("user")!));
        },
      },
    );
  }

  if (isLoading)
    return (
      <div className="flex flex-col gap-2 p-5">
        <div className="mb-10 h-10 w-32 animate-pulse rounded-lg bg-slate-200"></div>
        <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200"></div>
        <div className="h-10 w-full animate-pulse rounded-lg bg-slate-200"></div>
        <div className="h-32 w-full animate-pulse rounded-lg bg-slate-200"></div>
      </div>
    );

  if (isError)
    return (
      <AlertError message="Gagal memuat data user" containerClassName="px-5" />
    );

  if (!data) return;

  return (
    <main className="space-y-10 p-5 pb-24">
      <section>
        <Link href={"/profile"} className="flex items-center gap-1">
          <ChevronLeftIcon />
          <h2 className="text-xl font-semibold">Edit Profil</h2>
        </Link>
      </section>

      <section className="flex flex-col items-center gap-2 pt-10">
        <div className="relative size-20">
          {form.getValues("avatar") === "NONE" ? (
            <DefaultUserIcon containerClassName="size-20 -mt-10" />
          ) : (
            <div className="relative -mt-10 mb-2 size-20">
              <Image
                src={`/img/${form.getValues("avatar")}.png`}
                alt="User Avatar"
                fill
              />
            </div>
          )}
          <button className="absolute bottom-10 right-0 flex size-6 items-center justify-center rounded-full bg-primary-500 text-white">
            <Edit2Icon className="size-3" />
          </button>
        </div>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex w-full flex-col gap-2"
          >
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
            {/* <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Jenis Kelamin</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Pilih jenis kelamin" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={"MALE"}>Laki-laki</SelectItem>
                      <SelectItem value={"FEMALE"}>Perempuan</SelectItem>
                      <SelectItem value={"UNSPECIFIED"}>
                        Tidak menyebutkan
                      </SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            /> */}

            <div className="mt-10 space-y-1">
              <Button
                type="submit"
                className="w-full"
                disabled={!form.formState.isDirty}
              >
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
