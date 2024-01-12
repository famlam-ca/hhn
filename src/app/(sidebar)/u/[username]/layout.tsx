import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/lib/auth-service";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { Navbar } from "@/components/profile/nav";

interface ProfileLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

const ProfileLayout = async ({ params, children }: ProfileLayoutProps) => {
  const self = await getSelfByUsername(params.username);

  if (!self) {
    redirect("/");
  }

  return (
    <>
      <Navbar user={self} />
      {children}
    </>
  );
};

export default ProfileLayout;
