"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoadingScreen } from "@/components/ui/loading-screen";

const ManagerDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    if (!user || user.role !== "MANAGER" || !user.isApproved) {
      router.push("/");
    } else {
      setIsLoading(false);
    }
  }, [user, router]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-foreground dark:text-white">
        Welcome, {user.name}!
      </h2>
    </div>
  );
};

export default ManagerDashboard;
