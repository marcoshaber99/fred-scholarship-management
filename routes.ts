// routes.ts

export const publicRoutes = ["/", "/auth/new-verification"];

export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error",
  "/auth/reset",
  "/auth/new-password",
];

export const apiAuthPrefix = "/api/auth";

export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

export const roleRoutes = {
  STUDENT: "/student-dashboard",
  ADMIN: "/admin-dashboard",
  MANAGER: "/manager-dashboard",
};

export const protectedRoutes = [
  "/dashboard",
  "/student-dashboard",
  "/student-dashboard/view-requests",
  "/student-dashboard/create-request",
  "/admin-dashboard",
  "/admin-dashboard/approved-requests",
  "/admin-dashboard/open-requests",
  "/admin-dashboard/approve-users",
  "/manager-dashboard",
  "/manager-dashboard/pending-approvals",
  "/manager-dashboard/approved-requests",
  "/settings",
  "/pending-approval",
];
