import { ScholarshipRequestForm } from "./ScholarshipRequestForm";

const CreateRequestPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Create New Scholarship Request</h1>
      <ScholarshipRequestForm />
    </div>
  );
};

export default CreateRequestPage;
