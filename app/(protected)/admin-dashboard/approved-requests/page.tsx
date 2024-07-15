import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ApprovedRequestsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Approved Scholarship Requests</h2>
      <Card>
        <CardHeader>
          <CardTitle>Request #1</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Student: John Doe</p>
          <p>Approved on: 2023-07-10</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Request #2</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Student: Jane Smith</p>
          <p>Approved on: 2023-07-05</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovedRequestsPage;
