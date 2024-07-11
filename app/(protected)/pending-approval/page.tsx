// app/(protected)/pending-approval/page.tsx

import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const PendingApprovalPage = async () => {
  const user = await currentUser();

  if (
    !user ||
    (user.role !== "ADMIN" && user.role !== "MANAGER") ||
    user.isApproved
  ) {
    redirect("/");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Account Pending Approval</h2>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-amber-500">
            <AlertTriangle />
            <span>Approval Status</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-lg">
            Your account is currently pending approval. An administrator will
            review your account shortly. Please check back later or contact
            support if you have any questions.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingApprovalPage;
