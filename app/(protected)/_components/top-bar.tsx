"use client";

import { UserButton } from "@/components/auth/user-button";
import { ModeToggle } from "@/components/mode-toggle";
import { useCurrentUser } from "@/hooks/use-current-user";

export const TopBar = () => {
  const user = useCurrentUser();

  return (
    <header className="bg-background border-b py-4 px-6">
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-semibold text-foreground">
          {user?.role === "STUDENT" && "Student Dashboard"}
          {user?.role === "ADMIN" && "Admin Dashboard"}
          {user?.role === "MANAGER" && "Manager Dashboard"}
        </h1>
        <div className="flex items-center space-x-2">
          <ModeToggle />
          <UserButton />
        </div>
      </div>
    </header>
  );
};
