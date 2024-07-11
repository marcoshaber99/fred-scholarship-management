"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "../_components/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoadingScreen } from "@/components/ui/loading-screen";

interface PendingUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

const AdminDashboard = () => {
  const [pendingUsers, setPendingUsers] = useState<PendingUser[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    if (user && (user.role !== "ADMIN" || !user.isApproved)) {
      router.push("/");
    } else {
      fetchPendingUsers();
    }
  }, [user, router]);

  const fetchPendingUsers = async () => {
    try {
      const response = await fetch("/api/admin/pending-users");
      if (response.ok) {
        const data = await response.json();
        setPendingUsers(data);
      } else {
        toast.error("Failed to fetch pending users");
      }
    } catch (error) {
      console.error("Error fetching pending users:", error);
      toast.error("An error occurred while fetching pending users");
    } finally {
      setIsLoading(false);
    }
  };

  const approveUser = async (userId: string) => {
    try {
      const response = await fetch("/api/admin/approve-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        setPendingUsers((prevUsers) =>
          prevUsers.filter((user) => user.id !== userId)
        );
        toast.success("User approved successfully");
      } else {
        toast.error("Failed to approve user");
      }
    } catch (error) {
      console.error("Error approving user:", error);
      toast.error("An error occurred while approving the user");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle>Total Users</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">1,234</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Active Scholarships</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">56</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{pendingUsers.length}</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Pending Approvals</CardTitle>
          </CardHeader>
          <CardContent>
            {pendingUsers.length === 0 ? (
              <p>No pending approvals at this time.</p>
            ) : (
              <ul className="space-y-2">
                {pendingUsers.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    <span>
                      {user.name} ({user.email}) - {user.role}
                    </span>
                    <Button onClick={() => approveUser(user.id)} size="sm">
                      Approve
                    </Button>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
