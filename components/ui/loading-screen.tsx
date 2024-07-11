import { Loader2 } from "lucide-react";

export const LoadingScreen = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    </div>
  );
};
