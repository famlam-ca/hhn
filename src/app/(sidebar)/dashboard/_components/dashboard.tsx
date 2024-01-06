import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/auth-options";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import { UserNav } from "@/components/navigation/user-nav";
import MobileNav from "@/components/navigation/mobile-nav";

import { ServerCards } from "./server-card";
import { ServerTable } from "./server-table";

export const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user!;

  return (
    <MaxWidthWrapper className="min-w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <MobileNav isAuth={!!user} />
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <small className="text-xs text-muted">
            Server Hardware Statistics
          </small>
        </div>
        <UserNav
          name={!user.username ? "" : user.username}
          full_name={!user.full_name ? "" : `${user.full_name}`}
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
