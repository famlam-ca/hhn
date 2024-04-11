import { redirect } from "next/navigation";

import { getSelf } from "@/lib/services/user-service";
import { CustomUser } from "@/types";

import { Navbar } from "./_components/navbar";

interface ProfileLayoutProps {
  params: { username: string };
  children: React.ReactNode;
}

const ProfileLayout = async ({ params, children }: ProfileLayoutProps) => {
  const self = (await getSelf(params.username)) as CustomUser;

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
