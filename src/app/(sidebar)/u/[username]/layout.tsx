import { redirect } from "next/navigation";

import { getSelfByUsername } from "@/lib/auth-service";
import { CustomUser } from "@/types/types";

import { Navbar } from "./_components/nav";

interface ProfileLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

const ProfileLayout = async ({ params, children }: ProfileLayoutProps) => {
  const self = (await getSelfByUsername(params.username)) as CustomUser;

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
