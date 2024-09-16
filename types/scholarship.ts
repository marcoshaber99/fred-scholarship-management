export interface ScholarshipRequest {
  id: string;
  userId: string;
  name: string;
  surname: string;
  age: number;
  campus: "LIMASSOL" | "NICOSIA";
  sport: string;
  registrationNumber?: string;
  phoneNumber: string;
  studyLevel: "UNDERGRADUATE" | "POSTGRADUATE";
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  updatedAt: string;
}

export type ScholarshipFormData = Omit<
  ScholarshipRequest,
  "id" | "userId" | "status" | "createdAt" | "updatedAt"
>;
