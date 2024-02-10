"use server";

import { serverData } from "@/server/proxmox";
import { serverType } from "@/types/types";

export const getServerById = async (id: number, type: serverType) => {
  if (id === undefined) {
    throw new Error("No id provided");
  }

  console.log("Server type:", type);
  console.log("Server id:", id);

  const { serverDataList } = await serverData(type);

  console.log("Server data list:", serverDataList);

  const server = serverDataList.find((server) => server.vmid === id);

  console.log("Server vmid", server?.vmid);
  console.log("Server:", server);

  if (!server) {
    throw new Error(`Server with id ${id} not found`);
  }

  return server;
};
