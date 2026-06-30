import type { Metadata, Viewport } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Low Level Designs",
  description: "Multiple Low level design Demo",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-full">
        <header className="flex grow justify-between bg-black px-4 py-3.5 text-white">
          <div>
            <Link href={"/"}>Homepage</Link>
          </div>
          <div className="hidden gap-5 text-sm md:flex">
            <Link href={"/shimmer"}>Shimmer</Link>
            <Link href={"/multi-lingual"}>Multilingual</Link>
            <Link href={"/inifinite-scroll"}>Inifinite scroll</Link>
            <Link href={"/accordian"}>Accordian</Link>
            <Link href={"/reddit-comment"}>Reddit comment</Link>
            <Link href={"/slider"}>Slider</Link>
            <Link href={"/pagination"}>Pagination</Link>
            PaginationPage
          </div>
        </header>
        <main className="p-5">{children}</main>
      </body>
    </html>
  );
}
