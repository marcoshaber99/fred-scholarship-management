"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { ScholarshipRequestForm } from "./scholarship-request-form";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { Button } from "@/components/ui/button";
import { fetchScholarshipRequests } from "@/lib/api";
import { ScholarshipRequest } from "@/types/scholarship";

const CreateRequestPage: React.FC = () => {
  const router = useRouter();
  const { data: existingRequests, isLoading } = useQuery<ScholarshipRequest[]>({
    queryKey: ["scholarshipRequests"],
    queryFn: fetchScholarshipRequests,
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  const pendingRequest = existingRequests?.find(
    (req) => req.status === "PENDING"
  );

  if (pendingRequest) {
    return (
      <div className="text-center">
        <h2 className="text-xl font-normal mb-4">Existing Pending Request</h2>
        <p className="font-normal">
          You already have a pending scholarship request. You cannot create a
          new request at this time.
        </p>
        <Button
          className="mt-4"
          onClick={() => router.push("/student-dashboard")}
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create New Scholarship Request</h1>
      <ScholarshipRequestForm />
    </div>
  );
};

export default CreateRequestPage;
