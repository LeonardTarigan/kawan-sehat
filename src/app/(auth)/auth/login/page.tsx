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
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username tidak boleh kosong" }),
  password: z.string().min(1, { message: "Password tidak boleh kosong" }),
});

type LoginFormSchema = z.infer<typeof loginFormSchema>;

export default function LoginPage() {
  const form = useForm<LoginFormSchema>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  function onSubmit(values: LoginFormSchema) {
    console.log(values);
  }

  return (
    <main className="z-0 flex h-screen flex-col justify-between gap-5 overflow-hidden px-5 pb-20 pt-10">
      <h1 className="text-center text-xl font-medium">
        Mulai hidup sehat bersama <br />{" "}
        <span className="text-3xl font-bold text-primary-500">KawanSehat</span>
      </h1>

      <div>
        <div className="relative -z-10 aspect-[6/5] w-[125vw] shrink-0 -translate-x-16 translate-y-10 border-2">
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
