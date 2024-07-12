"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scholarships Won</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">2</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
