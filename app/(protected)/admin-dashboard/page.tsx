// app/(protected)/admin-dashboard/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoadingScreen } from "@/components/ui/loading-screen";

const AdminDashboard = () => {
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    if (!user || user.role !== "ADMIN" || !user.isApproved) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-normal">Welcome, {user.name}!</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-normal">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-normal">1,234</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-normal">Active Scholarships</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-normal">56</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-normal">Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-normal">5</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
