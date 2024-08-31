import Image from "next/image";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { LoginButton } from "@/components/auth/login-button";
import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function Home() {
  const user = await currentUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-gray-100 to-gray-300">
      <div className="space-y-6 text-center">
        <Image
          src="/fu_logo.png"
          alt="Frederick University Logo"
          width={300}
          height={300}
          className="mx-auto mb-4"
        />
        <h1
          className={cn(
            "text-2xl font-semibold text-gray-800 drop-shadow-md",
            font.className
          )}
        >
          Scholarship Management
        </h1>

        <div>
          <LoginButton asChild>
            <Button size="lg">Sign in</Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
