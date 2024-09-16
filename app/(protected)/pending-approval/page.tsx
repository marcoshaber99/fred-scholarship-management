"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoadingScreen } from "@/components/ui/loading-screen";

const PendingApprovalPage = () => {
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    if (
      !user ||
      (user.role !== "ADMIN" && user.role !== "MANAGER") ||
      user.isApproved
    ) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Account Pending Approval</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-amber-500">
            <AlertTriangle className="h-5 w-5" />
            <span>Approval Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg font-normal">
            Your account is currently pending approval. An administrator will
            review your account shortly. Please check back later or contact
            support if you have any questions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingApprovalPage;
