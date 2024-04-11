import { redirect } from "next/navigation";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { validateSession } from "@/lib/auth";

import { Navbar } from "./_components/navbar";

const AdminLayout = async ({ children }: React.PropsWithChildren) => {
  const { user } = await validateSession();

  if (user?.role !== "admin") {
    redirect("/");
  }

  return (
    <>
      <Navbar username={user.username} />
      <MaxWidthWrapper className="max-w-full">{children}</MaxWidthWrapper>
    </>
  );
};

export default AdminLayout;
