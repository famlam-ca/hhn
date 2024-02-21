"use server";

import { serverData } from "@/server/proxmox";
import { ServerType } from "@/types/types";

export const getServerById = async (id: number | string, type: ServerType) => {
  if (id === undefined) {
    throw new Error("No id provided");
  }

  const data = await serverData(type);

  if (!data || !data.serverDataList) {
    throw new Error("Unable to fetch server data");
  }

  const server = data.serverDataList.find(
    (server) => server.vmid === (type === "lxc" ? String(id) : Number(id)),
  );

  if (!server) {
    throw new Error(`Server with id ${id} not found`);
  }

  return server;
};
