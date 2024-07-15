import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ViewRequestsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Your Scholarship Requests</h2>
      <Card>
        <CardHeader>
          <CardTitle>Request #1</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Status: Pending</p>
          <p>Submitted on: 2023-07-15</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Request #2</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Status: Approved</p>
          <p>Submitted on: 2023-06-30</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ViewRequestsPage;
