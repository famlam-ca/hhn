import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { serverData } from "@/server/proxmox";

import { columns } from "./columns";
import { ServerCards } from "./server-card";
import { ServerTable } from "./server-table";

export const Dashboard = async () => {
  const { serverDataList: data } = await serverData();

  return (
    <MaxWidthWrapper className="max-w-full">
      <h2 className="text-2xl font-semibold">Hardware</h2>

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
