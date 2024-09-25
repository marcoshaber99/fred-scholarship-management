import { Sidebar } from "./_components/sidebar";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session) {
    redirect("/auth/login");
  }

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-white dark:bg-black/10">
          <div className="container mx-auto px-6 py-16 md:py-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
