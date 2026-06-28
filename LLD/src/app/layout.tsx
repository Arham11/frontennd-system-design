import type { Metadata } from "next";
import "./globals.css";

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
      <body className="min-h-full p-5">{children}</body>
    </html>
  );
}
