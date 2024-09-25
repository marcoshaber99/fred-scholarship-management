// app/(protected)/admin-dashboard/page.tsx

"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { useQuery } from "@tanstack/react-query";
import { fetchScholarshipRequests } from "@/lib/api";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const AdminDashboard = () => {
  const router = useRouter();
  const user = useCurrentUser();

  const { data: scholarshipRequests, isLoading } = useQuery({
    queryKey: ["scholarshipRequests"],
    queryFn: fetchScholarshipRequests,
  });

  useEffect(() => {
    if (!user || user.role !== "ADMIN" || !user.isApproved) {
      router.push("/");
    }
  }, [user, router]);

  if (!user || isLoading) {
    return <LoadingScreen />;
  }

  const pendingRequests = scholarshipRequests?.filter(
    (request) => request.status === "PENDING"
  );
  const approvedRequests = scholarshipRequests?.filter(
    (request) => request.status === "APPROVED"
  );

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-normal">Welcome, {user.name}!</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="font-normal">Total Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-normal">
              {scholarshipRequests?.length || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-normal">Pending Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-normal">
              {pendingRequests?.length || 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-normal">Approved Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-normal">
              {approvedRequests?.length || 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <h3 className="text-xl font-semibold mt-8 mb-4">Recent Requests</h3>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {scholarshipRequests?.slice(0, 6).map((request) => (
          <Link
            href={`/admin-dashboard/request/${request.id}`}
            key={request.id}
          >
            <Card className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="font-normal">
                  {request.name} {request.surname}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>Sport: {request.sport}</p>
                <Badge
                  variant={
                    request.status === "PENDING" ? "secondary" : "success"
                  }
                >
                  {request.status}
                </Badge>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
