"use client";

import AlertError from "@/components/shared/alert-error";
import AutoExpandingTextarea from "@/components/shared/auto-expanding-textarea";
import { Button } from "@/components/shared/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/shared/form";
import { Input } from "@/components/shared/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/shared/select";
import useMutateCreatePost from "@/hooks/api/posts/useMutateCreatePost";
import useQueryTopics from "@/hooks/api/topics/useQueryTopics";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createPostFormSchema = z.object({
  topic_id: z.string().min(1, { message: "Topik tidak boleh kosong" }),
  title: z.string().min(1, { message: "Judul tidak boleh kosong" }),
  content: z.string().min(1, { message: "Deskripsi tidak boleh kosong" }),
});

type CreatePostFormSchema = z.infer<typeof createPostFormSchema>;

export default function AddPostPage() {
  const form = useForm<CreatePostFormSchema>({
    resolver: zodResolver(createPostFormSchema),
    defaultValues: {
      topic_id: "",
      title: "",
      content: "",
    },
  });

  const { data, isLoading, isError } = useQueryTopics();
  const { mutate } = useMutateCreatePost();

  async function onSubmit(values: CreatePostFormSchema) {
    mutate(values);
    form.reset();
  }

  if (isLoading)
    return (
      <div className="flex gap-2 px-5">
        {[...Array(3)].map((_, index) => (
          <div
            key={index}
            className="h-8 w-full animate-pulse rounded-full bg-slate-200"
          ></div>
        ))}
      </div>
    );

  if (isError)
    return (
      <AlertError message="Gagal memuat data topik" containerClassName="px-5" />
    );

  if (!data) return;

  return (
    <main className="p-5">
      <h2 className="mb-10 text-xl font-bold">Buat Post</h2>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <FormField
            control={form.control}
            name="topic_id"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih topik" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {data.data.topics.map(({ id, name }) => (
                      <SelectItem key={id} value={id}>
                        {name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Judul" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AutoExpandingTextarea
                    placeholder="Deskripsi"
                    initialRows={3}
                    maxRows={7}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end gap-2 pt-5">
            <Button
              variant={"outline"}
              type="button"
              onClick={() => form.reset()}
            >
              Reset
            </Button>
            <Button>Post</Button>
          </div>
        </form>
      </Form>
    </main>
  );
}
