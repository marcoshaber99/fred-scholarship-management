import { auth } from "@/auth";
import { getUserById } from "@/data/user";

export const currentUser = async () => {
  const session = await auth();
  if (!session?.user?.id) {
    return null;
  }

  const user = await getUserById(session.user.id);
  if (!user) {
    return null;
  }

  return {
    ...session.user,
    isApproved: user.isApproved,
  };
};

export const currentRole = async () => {
  const session = await auth();
  return session?.user?.role;
};
