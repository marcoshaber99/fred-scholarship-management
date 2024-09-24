"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { ScholarshipRequestForm } from "./scholarship-request-form";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { Button } from "@/components/ui/button";
import { fetchScholarshipRequests, fetchScholarshipRequest } from "@/lib/api";
import { ScholarshipRequest } from "@/types/scholarship";

const CreateRequestPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id");

  const { data: existingRequests, isLoading: isLoadingRequests } = useQuery<
    ScholarshipRequest[]
  >({
    queryKey: ["scholarshipRequests"],
    queryFn: fetchScholarshipRequests,
  });

  const { data: existingRequest, isLoading: isLoadingRequest } =
    useQuery<ScholarshipRequest | null>({
      queryKey: ["scholarshipRequest", requestId],
      queryFn: () =>
        requestId ? fetchScholarshipRequest(requestId) : Promise.resolve(null),
      enabled: !!requestId,
    });

  if (isLoadingRequests || isLoadingRequest) {
    return <LoadingScreen />;
  }

  const pendingRequest = existingRequests?.find(
    (req) => req.status === "PENDING"
  );

  if (pendingRequest && !requestId) {
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
      <h1 className="text-2xl font-bold">
        {requestId
          ? "Edit Scholarship Request"
          : "Create New Scholarship Request"}
      </h1>
      <ScholarshipRequestForm existingRequest={existingRequest} />
    </div>
  );
};

export default CreateRequestPage;
