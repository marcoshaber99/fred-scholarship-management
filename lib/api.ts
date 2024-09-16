import { ScholarshipRequest, ScholarshipFormData } from "@/types/scholarship";

export const fetchScholarshipRequests = async (): Promise<
  ScholarshipRequest[]
> => {
  const response = await fetch("/api/scholarship-request");
  if (!response.ok) {
    throw new Error("Failed to fetch scholarship requests");
  }
  return response.json();
};

export const fetchScholarshipRequest = async (
  id: string
): Promise<ScholarshipRequest> => {
  const response = await fetch(`/api/scholarship-request/${id}`);
  if (!response.ok) {
    throw new Error("Failed to fetch scholarship request");
  }
  return response.json();
};

export const submitScholarshipRequest = async (
  data: ScholarshipFormData & { isDraft: boolean }
): Promise<ScholarshipRequest> => {
  const response = await fetch("/api/scholarship-request", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to submit request");
  }
  return response.json();
};
