import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Frederick Sports Scholarships",
  description: "Sports Scholarship Management System",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <Toaster />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
