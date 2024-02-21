"use server";

import { serverData } from "@/server/proxmox";

export const getServerById = async (id: number | string) => {
  if (id === undefined) {
    throw new Error("No id provided");
  }

  const data = await serverData();

  if (!data || !data.serverDataList) {
    throw new Error("Unable to fetch server data");
  }

  const server = data.serverDataList.find((server) => server.vmid === id);

  if (!server) {
    throw new Error(`Server with id ${id} not found`);
  }

  return server;
};
