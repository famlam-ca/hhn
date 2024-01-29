"use server";

import { serverData } from "@/server/proxmox";

export const getServerById = async (id: number) => {
  if (id === undefined) {
    throw new Error("No id provided");
  }

  const { serverDataList } = await serverData();

  const server = serverDataList.find((server) => server.vmid === id);

  if (!server) {
    throw new Error(`Server with id ${id} not found`);
  }

  return server;
};
