import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/lib/auth-service";

interface ProfileLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

const ProfileLayout = async ({ params, children }: ProfileLayoutProps) => {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect("/");
  }

  return <>{children}</>;
};

export default ProfileLayout;
