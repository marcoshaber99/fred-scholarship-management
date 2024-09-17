"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PlusCircle, Edit, Clock, CheckCircle, XCircle } from "lucide-react";
import { ScholarshipRequestDetails } from "./scholarship-request-details";
import { ScholarshipRequest } from "@/types/scholarship";
import { fetchScholarshipRequests } from "@/lib/api";
import { Badge } from "@/components/ui/badge";

const StudentDashboard = () => {
  const router = useRouter();
  const user = useCurrentUser();
  const [selectedRequest, setSelectedRequest] =
    useState<ScholarshipRequest | null>(null);

  const {
    data: scholarshipRequests,
    isLoading,
    error,
  } = useQuery<ScholarshipRequest[]>({
    queryKey: ["scholarshipRequests"],
    queryFn: fetchScholarshipRequests,
    enabled: !!user && user.role === "STUDENT",
  });

  if (!user) return <LoadingScreen />;
  if (user.role !== "STUDENT") {
    router.push("/");
    return null;
  }
  if (isLoading) return <LoadingScreen />;
  if (error)
    return (
      <div className="font-normal">
        Error loading scholarship requests. Please try again later.
      </div>
    );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <Edit className="h-5 w-5" />;
      case "PENDING":
        return <Clock className="h-5 w-5" />;
      case "APPROVED":
        return <CheckCircle className="h-5 w-5" />;
      case "REJECTED":
        return <XCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "DRAFT":
        return "bg-gray-500";
      case "PENDING":
        return "bg-yellow-500";
      case "APPROVED":
        return "bg-green-500";
      case "REJECTED":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-semibold text-foreground dark:text-white">
          Scholarship Requests
        </h2>
      </div>

      {scholarshipRequests && scholarshipRequests.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scholarshipRequests.map((request) => (
            <Card
              key={request.id}
              className="hover:shadow-md transition-shadow duration-300 cursor-pointer font-normal"
              onClick={() => setSelectedRequest(request)}
            >
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <Badge
                    className={`${getStatusColor(request.status)} text-white`}
                  >
                    {request.status.charAt(0).toUpperCase() +
                      request.status.slice(1).toLowerCase()}
                  </Badge>
                  {getStatusIcon(request.status)}
                </div>
                <CardTitle className="text-lg mt-2">{request.sport}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                  {request.name} {request.surname}
                </p>
                <p className="text-xs text-gray-500">
                  Created: {new Date(request.createdAt).toLocaleDateString()}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="font-normal">
              You haven't created any scholarship requests yet.{" "}
            </CardTitle>
          </CardHeader>
        </Card>
      )}

      {selectedRequest && (
        <ScholarshipRequestDetails
          request={selectedRequest}
          isOpen={!!selectedRequest}
          onClose={() => setSelectedRequest(null)}
        />
      )}
    </div>
  );
};

export default StudentDashboard;
