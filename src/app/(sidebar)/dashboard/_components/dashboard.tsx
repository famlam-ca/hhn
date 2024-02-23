"use client";

import { useEffect, useState } from "react";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { getNodeData, getServerData } from "@/server/proxmox";
import { NodeData, ServerData, ServerType } from "@/types/types";

import { columns } from "./columns";
import { ServerCards } from "./server-card";
import { ServerTable } from "./server-table";
import { useSearchParams } from "next/navigation";

export const Dashboard = () => {
  const params = useSearchParams();
  const type = params.get("type");

  const [serverData, setServerData] = useState<ServerData[]>([]);
  const [nodeData, setNodeData] = useState<NodeData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const serverTypeMap: { [key: string]: ServerType } = {
        lxc: "lxc",
        qemu: "qemu",
      };
      const serverType = type ? serverTypeMap[type] : undefined;

      const serverData = await getServerData(serverType);
      const nodeData = await getNodeData();

      setServerData(serverData);
      setNodeData(nodeData);
    };

    getData();
  }, [type]);

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
