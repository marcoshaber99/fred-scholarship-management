import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";

interface ProtectedLayoutProps {
  children: React.ReactNode;
}

const ProtectedLayout = async ({ children }: ProtectedLayoutProps) => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return <>{children}</>;
};

export default ProtectedLayout;
