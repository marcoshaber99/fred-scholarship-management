import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ApprovedRequestsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Approved Requests</h2>
      <Card>
        <CardHeader>
          <CardTitle>Request #7</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Student: Grace Lee</p>
          <p>Approved on: 2023-07-12</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Request #8</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Student: Harry Chen</p>
          <p>Approved on: 2023-07-13</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ApprovedRequestsPage;
