import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PendingApprovalsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Pending Approvals</h2>
      <Card>
        <CardHeader>
          <CardTitle>Request #5</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Student: Eva Brown</p>
          <p>Submitted on: 2023-07-16</p>
          <Button className="mt-2">Review</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Request #6</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Student: Frank White</p>
          <p>Submitted on: 2023-07-17</p>
          <Button className="mt-2">Review</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PendingApprovalsPage;
