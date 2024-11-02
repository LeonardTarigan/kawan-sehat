"use client";

import { Button } from "@/components/shared/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shared/form";
import { Input } from "@/components/shared/input";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { AuthApi } from "@/repository/services/auth-service";
import toast from "react-hot-toast";
import { IErrorResponse } from "@/model/general-type";
import { ILoginPayload } from "@/model/auth-type";

const registerFormSchema = z.object({
  username: z.string().min(1, { message: "Username tidak boleh kosong" }),
  email: z
    .string()
    .email({ message: "Email tidak valid" })
    .min(1, { message: "Email tidak boleh kosong" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong" }),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

export default function RegisterPage() {
  const router = useRouter();

  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: RegisterFormSchema) {
    try {
      await AuthApi.register(values);

      toast.success("Registrasi akun berhasil");

      router.push("/auth/login");
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as IErrorResponse;
        toast.error(error.response.data.error);
      } else {
        toast.error("Gagal mendaftarkan akun");
      }
    }
  }

  return (
    <main className="flex h-screen flex-col justify-between gap-5 overflow-hidden">
      <div className="relative z-0 flex h-1/2 w-full">
        <h1 className="px-5 pt-10 text-center text-xl font-semibold text-white">
          Daftar sekarang dan jadilah bagian dari komunitas sehat
        </h1>
        <div className="absolute -left-24 -top-16 -z-10 aspect-[6/5] w-[150vw]">
          <Image src={"/img/register-image.png"} alt="Illustration" fill />
        </div>
      </div>

      <div className="px-5 pb-20">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="relative flex flex-col gap-2"
          >
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
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
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-5 w-full">
              Daftar
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
