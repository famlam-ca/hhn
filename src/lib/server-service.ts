"use server";

import { getServerData } from "@/server/proxmox";

export const getServerById = async (id: number) => {
  if (id === undefined) {
    throw new Error("No id provided");
  }

  const data = await getServerData();

  const server = data.find((server) => {
    // TODO: Compatibility with qemu type servers
    return server.vmid.toString() === id.toString();
  });

  if (!server) {
    throw new Error(`Server with id ${id} not found`);
  }

  return server;
};
