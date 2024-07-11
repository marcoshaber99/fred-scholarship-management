// app/(protected)/_components/dashboard-layout.tsx
"use client";

import React from "react";
import { SessionProvider } from "next-auth/react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <SessionProvider>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopBar />
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
            {children}
          </main>
        </div>
      </div>
    </SessionProvider>
  );
};
