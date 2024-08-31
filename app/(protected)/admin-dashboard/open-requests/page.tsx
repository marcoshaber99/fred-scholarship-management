"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoadingScreen } from "@/components/ui/loading-screen";

interface ScholarshipRequest {
  id: string;
  title: string;
  description: string;
  amount: number;
  status: string;
  userId: string;
  user: {
    name: string;
    email: string;
  };
}

export default function OpenRequestsPage() {
  const [requests, setRequests] = useState<ScholarshipRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const user = useCurrentUser();

  useEffect(() => {
    if (user && (user.role !== "ADMIN" || !user.isApproved)) {
      router.push("/");
    } else {
      fetchOpenRequests();
    }
  }, [user, router]);

  const fetchOpenRequests = async () => {
    try {
      const response = await fetch("/api/scholarship-requests?status=PENDING");
      if (response.ok) {
        const data = await response.json();
        setRequests(data);
      } else {
        toast.error("Failed to fetch open requests");
      }
    } catch (error) {
      console.error("Error fetching open requests:", error);
      toast.error("An error occurred while fetching open requests");
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async (requestId: string) => {
    try {
      const response = await fetch(
        `/api/scholarship-requests/${requestId}/approve`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        toast.success("Request approved successfully");
        setRequests(requests.filter((request) => request.id !== requestId));
      } else {
        toast.error("Failed to approve request");
      }
    } catch (error) {
      console.error("Error approving request:", error);
      toast.error("An error occurred while approving the request");
    }
  };

  const handleReject = async (requestId: string) => {
    try {
      const response = await fetch(
        `/api/scholarship-requests/${requestId}/reject`,
        {
          method: "POST",
        }
      );
      if (response.ok) {
        toast.success("Request rejected successfully");
        setRequests(requests.filter((request) => request.id !== requestId));
      } else {
        toast.error("Failed to reject request");
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
      toast.error("An error occurred while rejecting the request");
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Open Scholarship Requests</h1>
      {requests.length === 0 ? (
        <p>No open requests at this time.</p>
      ) : (
        requests.map((request) => (
          <Card key={request.id}>
            <CardHeader>
              <CardTitle>{request.title}</CardTitle>
              <Badge>{request.status}</Badge>
            </CardHeader>
            <CardContent>
              <p className="mb-2">
                <strong>Student:</strong> {request.user.name} (
                {request.user.email})
              </p>
              <p className="mb-2">
                <strong>Amount:</strong> ${request.amount.toFixed(2)}
              </p>
              <p className="mb-4">
                <strong>Description:</strong> {request.description}
              </p>
              <div className="flex space-x-2">
                <Button onClick={() => handleApprove(request.id)}>
                  Approve
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleReject(request.id)}
                >
                  Reject
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
