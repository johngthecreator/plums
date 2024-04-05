import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PLUMS: Your Personal Learning Management System",
  description: "PLUMS is a personal learning management system designed to help you organize all the topics you're learning.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html lang="en">
        <body className={inter.className}>{children}</body>
      </html>
  );
}
