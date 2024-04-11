"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { LoadingSkeletong } from "@/components/loading-skeleton";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { getNodeData, getServerData } from "@/lib/services/proxmox-service";
import { NodeData, ServerData, ServerType } from "@/types";

import { columns } from "./columns";
import { ServerCards } from "./server/server-card";
import { ServerTable } from "./server/server-table";

export const Dashboard = () => {
  const params = useSearchParams();
  const type = params.get("type");

  const [isLoading, setIsLoading] = useState(true);
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [serverData, setServerData] = useState<ServerData[]>([]);
  const [nodeData, setNodeData] = useState<NodeData[]>([]);

  useEffect(() => {
    const getData = async () => {
      if (isFirstLoad) setIsLoading(true);

      const serverTypeMap: { [key: string]: ServerType } = {
        lxc: "lxc",
        qemu: "qemu",
      };
      const serverType = type ? serverTypeMap[type] : undefined;

      const serverData = await getServerData(serverType);
      const nodeData = await getNodeData();

      setServerData(serverData);
      setNodeData(nodeData);

      if (isFirstLoad) {
        setIsLoading(false);
        setIsFirstLoad(false);
      }
    };
    getData();

    const interval = setInterval(getData, 30000);
    return () => clearInterval(interval);
  }, [type, isFirstLoad]);

  if (isLoading) {
    return <LoadingSkeletong />;
  }

  return (
    <MaxWidthWrapper className="max-w-full">
      <h2 className="text-2xl font-semibold">Hardware</h2>

      <div className="flex flex-col gap-2 sm:gap-4 xl:flex-row">
        <ServerCards nodeData={nodeData} />
      </div>

      <div className="my-4">
        <ServerTable columns={columns} data={serverData} />
      </div>
    </MaxWidthWrapper>
  );
};
