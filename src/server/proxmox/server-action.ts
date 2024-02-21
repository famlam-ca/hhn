"use server";

import { ServerType } from "@/types/types";
import { fetchAccessTicket } from "./request-access-ticket";

interface ServerActionProps {
  type: ServerType;
  vmid: number;
  action: "start" | "shutdown" | "stop" | "reboot" | string;
}

export const serverAction = async ({
  type,
  vmid,
  action,
}: ServerActionProps) => {
  // console.log("Server Type:", type); // debug

  const url = `${process.env.PROXMOX_API_URL}/nodes/pve/${type}/${vmid}/status/${action}`;

  const access = await fetchAccessTicket();

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
