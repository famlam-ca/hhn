"use server";

import axios from "axios";

import { ServerType } from "@/types/types";

import { getAccessTicket, getServerData } from "./proxmox-service";

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

interface ServerActionProps {
  vmid: number;
  action: "start" | "shutdown" | "stop" | "reboot" | string;
  type: ServerType;
}

export const serverAction = async ({
  type,
  vmid,
  action,
}: ServerActionProps) => {
  const access = await getAccessTicket();

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.PROXMOX_API_URL}/nodes/pve/${type}/${vmid}/status/${action}`,
    headers: {
      CSRFPreventionToken: access.csrfToken,
      Cookie: `PVEAuthCookie=${access.accessTicket}`,
    },
  };

  await axios.request(config);
};
