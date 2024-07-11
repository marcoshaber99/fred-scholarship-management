"use client";

import { UserButton } from "@/components/auth/user-button";
import { useCurrentUser } from "@/hooks/use-current-user";

export const TopBar = () => {
  const user = useCurrentUser();

  return (
    <header className="bg-white shadow-sm py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-gray-900">
          {user?.role === "STUDENT" && "Student Dashboard"}
          {user?.role === "ADMIN" && "Admin Dashboard"}
          {user?.role === "MANAGER" && "Manager Dashboard"}
        </h1>
        <UserButton />
      </div>
    </header>
  );
};
