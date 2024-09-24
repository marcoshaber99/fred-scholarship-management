import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScholarshipRequest } from "@/types/scholarship";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ScholarshipRequestDetailsProps {
  request: ScholarshipRequest;
  isOpen: boolean;
  onClose: () => void;
}

export function ScholarshipRequestDetails({
  request,
  isOpen,
  onClose,
}: ScholarshipRequestDetailsProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved":
        return "bg-green-500";
      case "pending":
        return "bg-yellow-500";
      case "rejected":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader className="flex flex-col items-start gap-2">
          <DialogTitle className="text-2xl font-semibold">
            Scholarship Request
          </DialogTitle>
          <Badge className={`${getStatusColor(request.status)} text-white`}>
            {request.status}
          </Badge>
        </DialogHeader>
        <ScrollArea className="max-h-[70vh] pr-4">
          <div className="grid gap-4 py-4">
            {[
              { label: "Name", value: request.name },
              { label: "Surname", value: request.surname },
              { label: "Age", value: request.age },
              { label: "Campus", value: request.campus },
              { label: "Sport", value: request.sport },
              {
                label: "Registration Number",
                value: request.registrationNumber || "N/A",
              },
              { label: "Phone Number", value: request.phoneNumber },
              { label: "Study Level", value: request.studyLevel },
              {
                label: "Created",
                value: format(new Date(request.createdAt), "PPpp"),
              },
            ].map((item, index) => (
              <div key={index} className="grid grid-cols-3 items-center gap-4">
                <span className="font-medium text-gray-600 dark:text-gray-400">
                  {item.label}:
                </span>
                <span className="col-span-2 font-normal">{item.value}</span>
              </div>
            ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
