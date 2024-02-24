"use server";

import { getServerData } from "@/server/proxmox";
import { ServerType } from "@/types/types";

export const getServerById = async (type: ServerType, id: number) => {
  if (id === undefined) {
    throw new Error("No id provided");
  }
  const data = await getServerData(type);
  const server = data.find((server) => {
    return server.vmid.toString() === id.toString();
  });
  if (!server) {
    throw new Error(`Server with id ${id} not found`);
  }
  return server;
};
