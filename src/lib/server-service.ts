"use server";

import { serverData } from "@/server/proxmox";
import { serverType } from "@/types/types";

export const getServerById = async (id: number, type: serverType) => {
  if (id === undefined) {
    throw new Error("No id provided");
  }

  const { serverDataList } = await serverData(type);

  const server = serverDataList.find((server) => server.vmid === id);

  if (!server) {
    throw new Error(`Server with id ${id} not found`);
  }

  return server;
};
