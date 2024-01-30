"use server";

import { fetchAccessTicket } from "./request-access-ticket";

interface ServerActionProps {
  vmid: number;
  action: "start" | "shutdown" | "stop" | "reboot" | string;
}

export const serverAction = async ({ vmid, action }: ServerActionProps) => {
  const url = `${process.env
    .PROXMOX_API_URL!}nodes/pve/lxc/${vmid}/status/${action}`;

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
