"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";
import Image from "next/image";
import { signOut } from "next-auth/react";

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
          ? "bg-primary/10 text-primary font-medium dark:bg-primary/20"
          : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span className="text-sm font-normal">{children}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const user = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const handleLogout = async () => {
    await signOut();
    router.push("/auth/login");
  };

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
        className={`bg-background border-r dark:border-gray-800 fixed inset-y-0 left-0 z-40 w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:shadow-none flex flex-col`}
      >
        <div className="flex-grow">
          <div className="p-4 border-b dark:border-gray-800 mt-2">
            <div className="flex items-center space-x-3 mb-4 md:mt-0 mt-8">
              <Image
                src="/logo-dark.svg"
                alt="Frederick University Logo"
                width={32}
                height={32}
                className="rounded-full hidden dark:block"
              />
              <Image
                src="/logo.svg"
                alt="Frederick University Logo"
                width={32}
                height={32}
                className="rounded-full dark:hidden"
              />
              <h1 className="text-md font-bold text-primary">
                Frederick University
              </h1>
            </div>
            <div className="flex items-center space-x-3 pl-3 bg-accent rounded-lg">
              <User className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="text-sm font-medium text-foreground">
                  {user?.name || "User"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {user?.role || "Role"}
                </p>
              </div>
            </div>
          </div>

          <nav className="mt-6 px-4 space-y-1 overflow-y-auto">
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

        <div className="p-4 border-t dark:border-gray-800">
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  );
};
