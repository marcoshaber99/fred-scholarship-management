// app/(protected)/admin-dashboard/open-requests/page.tsx

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const OpenRequestsPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Open Scholarship Requests</h2>
      <Card>
        <CardHeader>
          <CardTitle>Request #3</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Student: Alice Johnson</p>
          <p>Submitted on: 2023-07-15</p>
          <Button className="mt-2">Review</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Request #4</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Student: Bob Williams</p>
          <p>Submitted on: 2023-07-14</p>
          <Button className="mt-2">Review</Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default OpenRequestsPage;
