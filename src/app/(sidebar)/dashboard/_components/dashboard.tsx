import { getServerSession } from "next-auth";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { UserNav } from "@/components/navigation/user-nav";
import { authOptions } from "@/lib/auth-options";
import { serverData } from "@/server/proxmox";

import { ServerCards } from "./server-card";
import { columns } from "./columns";
import { ServerTable } from "./server-table";

export const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user!;

  const { serverDataList: data } = await serverData();

  return (
    <MaxWidthWrapper className="max-w-full">
      <div className="flex items-center justify-between">
        <div className="text-center sm:text-left">
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <small className="text-xs text-muted-foreground">
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

      <div className="my-4">
        <ServerTable columns={columns} data={data} />
      </div>
    </MaxWidthWrapper>
  );
};

export const DashboardSkeleton = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <div className="flex space-x-2">
        <div className="h-8 w-8 animate-bounce rounded-full bg-text [animation-delay:-0.3s]" />
        <div className="h-8 w-8 animate-bounce rounded-full bg-text [animation-delay:-0.15s]" />
        <div className="h-8 w-8 animate-bounce rounded-full bg-text" />
      </div>
      <p className="text-4xl">Loading data... Please wait!</p>
    </div>
  );
};
