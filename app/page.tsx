import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex h-screen items-center justify-center">
      <div className="space-y-6 text-center">
        <Image
          src="/logo.svg"
          alt="Frederick University Logo"
          width={100}
          height={100}
          className="mx-auto mb-4"
        />
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
