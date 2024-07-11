// app/(protected)/manager-dashboard/page.tsx

import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { DashboardLayout } from "../_components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ManagerDashboard = async () => {
  const user = await currentUser();

  if (!user || user.role !== "MANAGER" || !user.isApproved) {
    redirect("/");
  }

  return (
    <DashboardLayout>
      <div className="space-y-4">
        <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">42</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">15</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Approved Applications</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">27</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerDashboard;
