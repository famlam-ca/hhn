"use server";

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
  const url = `${process.env.PROXMOX_API_URL}/nodes/pve/${type}/${vmid}/status/${action}`;

  const access = await getAccessTicket();

  const myHeaders = new Headers();
  myHeaders.append("CSRFPreventionToken", access.csrfToken);
  myHeaders.append("Cookie", `PVEAuthCookie=${access.accessTicket}`);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  await fetch(url, requestOptions);
};
