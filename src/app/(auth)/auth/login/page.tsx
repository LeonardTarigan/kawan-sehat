"use client";

import { login } from "@/actions/auth-service";
import { Button } from "@/components/shared/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shared/form";
import { Input } from "@/components/shared/input";
import { IErrorResponse } from "@/model/general-type";
import { zodResolver } from "@hookform/resolvers/zod";
import Cookies from "js-cookie";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";

const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username tidak boleh kosong" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong" }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const router = useRouter();

  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: LoginFormSchema) {
    try {
      const { data, error } = await login(values);

      if (error) {
        toast.error(error);
      }

      Cookies.set("token", data.token);
      Cookies.set("user", JSON.stringify(data.account));

      router.push("/");
    } catch (err) {
      if (err && typeof err === "object" && "response" in err) {
        const error = err as IErrorResponse;
        toast.error(error.response.data.error);
      } else {
        toast.error("Username atau password salah!");
      }
    }
  }

  return (
    <main className="z-0 flex h-screen flex-col justify-between gap-5 overflow-hidden px-5 pb-20 pt-10 lg:overflow-auto">
      <h1 className="text-center text-xl font-medium">
        Mulai hidup sehat bersama <br />{" "}
        <span className="text-3xl font-bold text-primary-500">KawanSehat</span>
      </h1>

      <div>
        <div className="relative -z-10 aspect-[6/5] w-[125vw] max-w-[500px] shrink-0 -translate-x-16 translate-y-10">
          <Image src={"/img/login-image.png"} alt="Illustration" fill />
        </div>
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
              Masuk
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
