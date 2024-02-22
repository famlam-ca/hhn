"use client";

import { useEffect, useState } from "react";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { getNodeData, getServerData } from "@/server/proxmox";
import { NodeData, ServerData } from "@/types/types";

import { columns } from "./columns";
import { ServerCards } from "./server-card";
import { ServerTable } from "./server-table";

export const Dashboard = () => {
  const [data, setData] = useState<ServerData[]>([]);
  const [nodeData, setNodeData] = useState<NodeData[]>([]);

  useEffect(() => {
    const getData = async () => {
      const data = await getServerData();
      const nodeData = await getNodeData();

      setData(data);
      setNodeData(nodeData);
    };

    getData();
  }, []);

  return (
    <MaxWidthWrapper className="max-w-full">
      <h2 className="text-2xl font-semibold">Hardware</h2>

      <div className="flex flex-col gap-2 sm:gap-4 xl:flex-row">
        <ServerCards nodeData={nodeData} />
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
