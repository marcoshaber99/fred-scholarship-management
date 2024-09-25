"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchScholarshipRequest } from "@/lib/api";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const RequestDetailsPage = () => {
  const params = useParams();
  const router = useRouter();
  const { id } = params;

  const { data: request, isLoading } = useQuery({
    queryKey: ["scholarshipRequest", id],
    queryFn: () => fetchScholarshipRequest(id as string),
  });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!request) {
    return <div>Request not found</div>;
  }

  const detailsGroups = [
    {
      title: "Personal Information",
      items: [
        { label: "Name", value: request.name },
        { label: "Surname", value: request.surname },
        { label: "Age", value: request.age },
        { label: "Phone Number", value: request.phoneNumber },
      ],
    },
    {
      title: "Academic Information",
      items: [
        { label: "Campus", value: request.campus },
        { label: "Study Level", value: request.studyLevel },
        {
          label: "Registration Number",
          value: request.registrationNumber || "N/A",
        },
      ],
    },
    {
      title: "Scholarship Information",
      items: [
        { label: "Sport", value: request.sport },
        {
          label: "Status",
          value: (
            <Badge
              variant={request.status === "PENDING" ? "secondary" : "success"}
            >
              {request.status}
            </Badge>
          ),
        },
      ],
    },
    {
      title: "Request Timeline",
      items: [
        {
          label: "Created At",
          value: format(new Date(request.createdAt), "PPpp"),
        },
        {
          label: "Updated At",
          value: format(new Date(request.updatedAt), "PPpp"),
        },
      ],
    },
  ];

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      <Button onClick={() => router.back()} variant="outline" className="mb-4">
        Back to Dashboard
      </Button>

      <Card className="shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-xl font-semibold">
            Scholarship Request Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          {detailsGroups.map((group, index) => (
            <div key={index} className="mb-4">
              <h3 className="text-md font-semibold mb-2">{group.title}</h3>
              <dl className="grid grid-cols-2 gap-x-3 gap-y-1">
                {group.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="py-1">
                    <dt className="text-xs font-medium text-gray-500 dark:text-gray-400">
                      {item.label}
                    </dt>
                    <dd className="text-sm">{item.value}</dd>
                  </div>
                ))}
              </dl>
              {index < detailsGroups.length - 1 && (
                <Separator className="my-3" />
              )}
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestDetailsPage;
