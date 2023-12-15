import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserAccountNav from "@/components/navigation/UserAccountNav";
import ServerTable from "./ServerTable";
import MobileNav from "../navigation/MobileNav";
import ServerCards from "./ServerCard";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user!;

  return (
    <MaxWidthWrapper className="min-w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <MobileNav isAuth={!!user} />
        <div>
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <small className="text-xs text-muted">
            Server Hardware Statistics
          </small>
        </div>
        <UserAccountNav
          name={!user.name ? "Username" : `${user.name}`}
          full_name={!user.full_name ? "User" : `${user.full_name}`}
          email={user.email ?? ""}
          imageUrl={user.image ?? ""}
          role={user.role ?? ""}
        />
      </div>

      {/* Hardware Summary Cards */}
      <div className="flex flex-col gap-2 md:gap-4 lg:flex-row">
        <ServerCards />
      </div>

      {/* Servers */}
      <div className="my-8">
        <h2 className="mb-3 text-2xl font-semibold">Servers</h2>
        <ServerTable />
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
