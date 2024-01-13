import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth-options";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { UserNav } from "@/components/navigation/user-nav";

import { ServerCards } from "./server-card";
import { ServerTable } from "./server-table";
import { RefreshButton } from "./refresh-button";

export const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user!;

  return (
    <MaxWidthWrapper className="max-w-full">
      <div className="flex items-center justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <small className="text-xs text-muted">
            Server Hardware Statistics
          </small>
        </div>
        <UserNav
          username={!user.username ? "" : user.username}
          full_name={
            !user.first_name && !user.last_name
              ? ""
              : `${user.first_name} ${user.last_name}`
          }
          email={user.email ?? ""}
          imageUrl={user.image ?? ""}
          role={user.role ?? ""}
        />
      </div>

      <div className="flex flex-col gap-2 sm:gap-4 xl:flex-row">
        <ServerCards />
      </div>

      <div className="my-8">
        <div className="flex items-center justify-between">
          <div className="mb-3 flex flex-col">
            <h2 className="text-2xl font-semibold">Servers</h2>
            <small className="text-muted">Last 30s</small>
          </div>
          <RefreshButton />
        </div>
        <ServerTable />
      </div>
    </MaxWidthWrapper>
  );
};
