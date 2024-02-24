"use server";

import axios from "axios";

import { ServerType } from "@/types/types";

import { getAccessTicket } from "./request-access-ticket";

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
