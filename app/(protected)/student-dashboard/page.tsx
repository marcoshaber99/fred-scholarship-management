// app/(protected)/student-dashboard/page.tsx
import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const StudentDashboard = async () => {
  const user = await currentUser();

  if (!user || user.role !== "STUDENT") {
    redirect("/");
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Welcome, {user.name}!</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Active Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">3</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Scholarships Won</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Pending Applications</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-semibold">2</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentDashboard;
