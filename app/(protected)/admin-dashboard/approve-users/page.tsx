// app/(protected)/admin-dashboard/approve-users/page.tsx

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
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

const ApproveUsersPage = () => {
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
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Approve Users</h2>
      {pendingUsers.length === 0 ? (
        <p>No pending approvals at this time.</p>
      ) : (
        pendingUsers.map((user) => (
          <Card key={user.id}>
            <CardHeader>
              <CardTitle>{user.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Email: {user.email}</p>
              <p>Role: {user.role}</p>
              <Button onClick={() => approveUser(user.id)} className="mt-2">
                Approve
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
};

export default ApproveUsersPage;
