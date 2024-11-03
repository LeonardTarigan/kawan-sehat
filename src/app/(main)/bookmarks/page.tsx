"use client";

import SectionPosts from "@/components/bookmark/section-posts";
import { Input } from "@/components/shared/input";

export default function BookmarksPage() {
  return (
    <main className="space-y-5 p-5 pb-24">
      <section>
        <Input placeholder="Cari Bookmark" />
      </section>
      <SectionPosts />
    </main>
  );
}
