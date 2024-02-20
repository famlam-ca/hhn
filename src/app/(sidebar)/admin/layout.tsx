import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { authOptions } from "@/lib/auth-options";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";

import { Navbar } from "./_components/nav";

const AdminLayout = async ({ children }: React.PropsWithChildren) => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

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
