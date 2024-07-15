"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  Menu,
  X,
  PlusCircle,
  CheckCircle,
  Clock,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Image from "next/image";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  children: React.ReactNode;
}

const SidebarLink: React.FC<SidebarLinkProps> = ({
  href,
  icon: Icon,
  children,
}) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link
      href={href}
      className={`flex items-center space-x-3 py-2 px-4 rounded-lg transition-all duration-200 ${
        isActive
          ? "bg-blue-100 text-blue-700 font-medium"
          : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm">{children}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const user = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-50 md:hidden"
        onClick={toggleSidebar}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>

      <aside
        className={`bg-white shadow-lg fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:shadow-none`}
      >
        <div className="flex flex-col h-full">
          <div className="p-4 border-b mt-2">
            <Image
              src="/fu_logo.png"
              alt="Sports Scholarships Logo"
              width={200}
              height={50}
              priority
              className="mb-6"
            />
            <div className="flex items-center space-x-3 pl-3 bg-gray-50 rounded-lg">
              <User className="h-5 w-5 text-gray-500" />
              <div>
                <p className="text-sm font-medium text-gray-800">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-gray-500">{user?.role || "Role"}</p>
              </div>
            </div>
          </div>

          <nav className="flex-grow mt-6 px-4 space-y-1 overflow-y-auto">
            {user?.role === "STUDENT" && (
              <>
                <SidebarLink href="/student-dashboard" icon={LayoutDashboard}>
                  Dashboard
                </SidebarLink>
                <SidebarLink
                  href="/student-dashboard/view-requests"
                  icon={FileText}
                >
                  View Requests
                </SidebarLink>
                <SidebarLink
                  href="/student-dashboard/create-request"
                  icon={PlusCircle}
                >
                  Create Request
                </SidebarLink>
              </>
            )}
            {user?.role === "ADMIN" && user.isApproved && (
              <>
                <SidebarLink href="/admin-dashboard" icon={LayoutDashboard}>
                  Dashboard
                </SidebarLink>
                <SidebarLink
                  href="/admin-dashboard/approved-requests"
                  icon={CheckCircle}
                >
                  Approved Requests
                </SidebarLink>
                <SidebarLink href="/admin-dashboard/open-requests" icon={Clock}>
                  Open Requests
                </SidebarLink>
                <SidebarLink href="/admin-dashboard/approve-users" icon={Users}>
                  Approve Users
                </SidebarLink>
              </>
            )}
            {user?.role === "MANAGER" && user.isApproved && (
              <>
                <SidebarLink href="/manager-dashboard" icon={LayoutDashboard}>
                  Dashboard
                </SidebarLink>
                <SidebarLink
                  href="/manager-dashboard/pending-approvals"
                  icon={Clock}
                >
                  Pending Approvals
                </SidebarLink>
                <SidebarLink
                  href="/manager-dashboard/approved-requests"
                  icon={CheckCircle}
                >
                  Approved Requests
                </SidebarLink>
              </>
            )}
            <SidebarLink href="/settings" icon={Settings}>
              Settings
            </SidebarLink>
          </nav>
        </div>
      </aside>
    </>
  );
};
