"use server";

import { getServerData } from "@/server/proxmox";

export const getServerById = async (id: number) => {
  if (id === undefined) {
    throw new Error("No id provided");
  }

  const data = await getServerData();

  const server = data.find((server) => {
    if (server.type !== "lxc") {
      return server.vmid.toString() === id.toString();
    }
    return server.vmid === id;
  });

  if (!server) {
    throw new Error(`Server with id ${id} not found`);
  }

  return server;
};
