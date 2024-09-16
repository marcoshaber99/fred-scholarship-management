"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { PlusCircle, Edit, Clock, CheckCircle, XCircle } from "lucide-react";

interface ScholarshipRequest {
  id: string;
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
  // Add other fields as needed
}

const fetchScholarshipRequests = async (): Promise<ScholarshipRequest[]> => {
  const response = await fetch("/api/scholarship-request");
  if (!response.ok) {
    throw new Error("Failed to fetch scholarship requests");
  }
  return response.json();
};

const StudentDashboard = () => {
  const router = useRouter();
  const user = useCurrentUser();

  const {
    data: scholarshipRequests,
    isLoading,
    error,
  } = useQuery<ScholarshipRequest[]>({
    queryKey: ["scholarshipRequests"],
    queryFn: fetchScholarshipRequests,
    enabled: !!user && user.role === "STUDENT",
  });

  if (!user) {
    return <LoadingScreen />;
  }

  if (user.role !== "STUDENT") {
    router.push("/");
    return null;
  }

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return (
      <div className="font-normal">
        Error loading scholarship requests. Please try again later.
      </div>
    );
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "DRAFT":
        return <Edit className="h-5 w-5 text-gray-500" />;
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "APPROVED":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "REJECTED":
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-normal text-foreground dark:text-white">
        Welcome, {user.name}!
      </h2>

      {scholarshipRequests && scholarshipRequests.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {scholarshipRequests.map((request) => (
            <Card key={request.id} className="font-normal dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between font-normal">
                  Scholarship Request
                  {getStatusIcon(request.status)}
                </CardTitle>
                <CardDescription className="font-normal">
                  Status:{" "}
                  {request.status.charAt(0).toUpperCase() +
                    request.status.slice(1).toLowerCase()}
                </CardDescription>
              </CardHeader>
              <CardContent className="font-normal">
                <p>
                  Created: {new Date(request.createdAt).toLocaleDateString()}
                </p>
                <p>
                  Last Updated:{" "}
                  {new Date(request.updatedAt).toLocaleDateString()}
                </p>
              </CardContent>
              <CardFooter>
                {request.status === "DRAFT" && (
                  <Button
                    onClick={() =>
                      router.push(
                        `/student-dashboard/create-request?id=${request.id}`
                      )
                    }
                  >
                    Edit Draft
                  </Button>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="font-normal">
              No Scholarship Requests
            </CardTitle>
            <CardDescription className="font-normal">
              You haven't created any scholarship requests yet.
            </CardDescription>
          </CardHeader>
          <CardContent className="font-normal">
            <p>
              Click the button below to create your first scholarship request.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => router.push("/student-dashboard/create-request")}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Create Scholarship Request
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default StudentDashboard;
