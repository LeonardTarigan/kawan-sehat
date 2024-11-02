import { rubik } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kawan Sehat",
  description: "Kawan sehat, tubuh kuat, jiwa semangat!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body className={`${rubik.className} bg-primary-50 antialiased`}>
        <div className="mx-auto max-w-md">{children}</div>
      </body>
    </html>
  );
}
