import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";

const Page = async () => {
  const session = await getServerSession(authOptions);
  const role = session?.user.role;

  if (role === "user") {
    redirect("/unauthorized");
  }

  return <div>Dashboard</div>;
};

export default Page;
