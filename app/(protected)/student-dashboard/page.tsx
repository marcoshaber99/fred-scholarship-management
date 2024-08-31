"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoadingScreen } from "@/components/ui/loading-screen";

const StudentDashboard = () => {
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    if (!user || user.role !== "STUDENT") {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
    </div>
  );
};

export default StudentDashboard;
