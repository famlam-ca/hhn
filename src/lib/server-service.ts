"use server";

import { serverData } from "@/server/proxmox";
import { ServerType } from "@/types/types";

export const getServerById = async (id: number | string, type: ServerType) => {
  if (id === undefined) {
    throw new Error("No id provided");
  }

  const { serverDataList } = await serverData(type);

  const server = serverDataList.find(
    (server) => server.vmid === (type === "lxc" ? String(id) : Number(id)),
  );

  if (!server) {
    throw new Error(`Server with id ${id} not found`);
  }

  return server;
};
