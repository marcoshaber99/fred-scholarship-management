"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingScreen } from "@/components/ui/loading-screen";
import { ScholarshipRequest, ScholarshipFormData } from "@/types/scholarship";
import {
  fetchScholarshipRequests,
  fetchScholarshipRequest,
  submitScholarshipRequest,
} from "@/lib/api";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  surname: z.string().min(2, "Surname must be at least 2 characters"),
  age: z.coerce.number().int().positive().max(100),
  campus: z.enum(["LIMASSOL", "NICOSIA"]),
  sport: z.string().min(2, "Sport must be at least 2 characters"),
  registrationNumber: z.string().optional(),
  phoneNumber: z.string().regex(/^\+?[0-9]{10,14}$/, "Invalid phone number"),
  studyLevel: z.enum(["UNDERGRADUATE", "POSTGRADUATE"]),
});

export function ScholarshipRequestForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestId = searchParams.get("id");
  const queryClient = useQueryClient();

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

  const form = useForm<ScholarshipFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: existingRequest || {
      name: "",
      surname: "",
      age: undefined,
      campus: undefined,
      sport: "",
      registrationNumber: "",
      phoneNumber: "",
      studyLevel: undefined,
    },
  });

  const mutation = useMutation({
    mutationFn: submitScholarshipRequest,
    onSuccess: (data, variables) => {
      toast(variables.isDraft ? "Draft saved" : "Request submitted", {
        description: variables.isDraft
          ? "Your draft has been saved successfully."
          : "Your scholarship request has been submitted for approval.",
      });
      queryClient.invalidateQueries({ queryKey: ["scholarshipRequests"] });
      router.push("/student-dashboard");
    },
    onError: (error: Error) => {
      toast.error("Error", {
        description:
          error.message || "An error occurred while submitting your request.",
      });
    },
  });

  const onSubmit = (data: ScholarshipFormData, isDraft: boolean) => {
    const pendingRequest = existingRequests?.find(
      (req) => req.status === "PENDING"
    );
    if (pendingRequest && !isDraft) {
      toast.error("Error", {
        description: "You already have a pending scholarship request.",
      });
      return;
    }
    mutation.mutate({ ...data, isDraft });
  };

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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => onSubmit(data, false))}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="surname"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Surname</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="age"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Age</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="campus"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Campus</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a campus" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="LIMASSOL">Limassol</SelectItem>
                  <SelectItem value="NICOSIA">Nicosia</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="sport"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sport</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="registrationNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Registration Number (Optional)</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="studyLevel"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Study Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select study level" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="UNDERGRADUATE">Undergraduate</SelectItem>
                  <SelectItem value="POSTGRADUATE">Postgraduate</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex space-x-4">
          <Button type="submit" disabled={mutation.isPending}>
            Submit Request
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => onSubmit(form.getValues(), true)}
            disabled={mutation.isPending}
          >
            Save as Draft
          </Button>
        </div>
      </form>
    </Form>
  );
}
