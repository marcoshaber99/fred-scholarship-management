// app/(protected)/dashboard/page.tsx

import { redirect } from "next/navigation";
import { currentUser } from "@/lib/auth";
import { roleRoutes } from "@/routes";

const DashboardPage = async () => {
  const user = await currentUser();

  if (!user) {
    redirect("/auth/login");
  }

  if (user.role && roleRoutes[user.role]) {
    if (user.role === "ADMIN" || user.role === "MANAGER") {
      if (!user.isApproved) {
        redirect("/pending-approval");
      }
    }
    redirect(roleRoutes[user.role]);
  }

  // Fallback redirect if none of the above conditions are met
  redirect("/");
};

export default DashboardPage;
