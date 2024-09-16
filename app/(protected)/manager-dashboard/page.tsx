"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoadingScreen } from "@/components/ui/loading-screen";

const ManagerDashboard = () => {
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    if (!user || user.role !== "MANAGER" || !user.isApproved) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <>
      <h2 className="text-2xl font-normal text-foreground dark:text-white">
        Welcome, {user.name}!
      </h2>
    </>
  );
};

export default ManagerDashboard;
