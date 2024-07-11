"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCurrentUser } from "@/hooks/use-current-user";
import { LayoutDashboard, Users, FileText, Settings } from "lucide-react";
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
      className={`flex items-center space-x-2 py-2 px-4 rounded-lg ${
        isActive
          ? "bg-gray-200 text-gray-900"
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

  return (
    <div className="w-64 bg-white shadow-md h-full">
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
            <SidebarLink href="/student-dashboard/applications" icon={FileText}>
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
            <SidebarLink href="/manager-dashboard/applications" icon={FileText}>
              Applications
            </SidebarLink>
          </>
        )}
        <SidebarLink href="/settings" icon={Settings}>
          Settings
        </SidebarLink>
      </nav>
    </div>
  );
};
