import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const CreateRequestPage = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Create New Scholarship Request</h2>
      <form className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Request Title
          </label>
          <Input id="title" placeholder="Enter request title" />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700"
          >
            Description
          </label>
          <Textarea id="description" placeholder="Describe your request" />
        </div>
        <Button type="submit">Submit Request</Button>
      </form>
    </div>
  );
};

export default CreateRequestPage;
