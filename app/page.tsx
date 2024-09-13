import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { ModeToggle } from "@/components/mode-toggle";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="space-y-6 text-center">
        <div className="flex items-center justify-center">
          <Image
            src="/logo.svg"
            alt="Frederick Sports Club Logo"
            width={120}
            height={120}
            className="rounded-full dark:hidden"
          />
          <Image
            src="/logo-dark.svg"
            alt="Frederick Sports Club Logo"
            width={120}
            height={120}
            className="rounded-full hidden dark:block"
          />
        </div>
        <h1 className="text-2xl font-semibold">Scholarship Management</h1>

        <div>
          <LoginButton asChild>
            <Button size="lg">Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
