"use client";

import { useState } from "react";
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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

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
      className={`flex items-center space-x-2 py-2 px-4 rounded-lg transition-colors ${
        isActive
          ? "bg-blue-100 text-blue-700"
          : "text-gray-600 hover:bg-gray-100"
      }`}
    >
      <Icon className="h-5 w-5" />
      <span>{children}</span>
    </Link>
  );
};

export const Sidebar = () => {
  const user = useCurrentUser();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="fixed top-4 left-4 z-40 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </Button>
      <div
        className={`bg-white shadow-md fixed inset-y-0 left-0 z-30 w-64 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:relative md:translate-x-0`}
      >
        <div className="p-4">
          <h2 className="text-2xl font-semibold text-gray-800">
            Sports Scholarships
          </h2>
        </div>
        <nav className="mt-8 px-4">
          {user?.role === "STUDENT" && (
            <>
              <SidebarLink href="/student-dashboard" icon={LayoutDashboard}>
                Dashboard
              </SidebarLink>
              <SidebarLink
                href="/student-dashboard/applications"
                icon={FileText}
              >
                Applications
              </SidebarLink>
            </>
          )}
          {user?.role === "ADMIN" && user.isApproved && (
            <>
              <SidebarLink href="/admin-dashboard" icon={LayoutDashboard}>
                Dashboard
              </SidebarLink>
              <SidebarLink href="/admin-dashboard/users" icon={Users}>
                Manage Users
              </SidebarLink>
              <SidebarLink href="/admin-dashboard/scholarships" icon={FileText}>
                Scholarships
              </SidebarLink>
            </>
          )}
          {user?.role === "MANAGER" && user.isApproved && (
            <>
              <SidebarLink href="/manager-dashboard" icon={LayoutDashboard}>
                Dashboard
              </SidebarLink>
              <SidebarLink
                href="/manager-dashboard/applications"
                icon={FileText}
              >
                Applications
              </SidebarLink>
            </>
          )}
          <SidebarLink href="/settings" icon={Settings}>
            Settings
          </SidebarLink>
        </nav>
      </div>
    </>
  );
};
