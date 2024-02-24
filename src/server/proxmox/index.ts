"use server";

import axios from "axios";

import { NodeData, ServerData, ServerType } from "@/types/types";

import { getAccessTicket } from "./request-access-ticket";

export const getServerData = async (
  type: ServerType = "lxc",
): Promise<ServerData[]> => {
  const { accessTicket, csrfToken } = await getAccessTicket();

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.PROXMOX_API_URL}/nodes/pve/${type}`,
    headers: {
      CSRFPreventionToken: csrfToken,
      Cookie: `PVEAuthCookie=${accessTicket}`,
    },
  };

  const addServerType = (data: ServerData[]) => {
    return data.map((server) => {
      if (!server.type) {
        server.type = "qemu";
      }
      return server;
    });
  };

  try {
    const res = await axios.request(config);
    let data = res.data.data.sort(
      (a: { vmid: number }, b: { vmid: number }) => a.vmid - b.vmid,
    );

    data = addServerType(data); // add type to server

    return data;
  } catch (error) {
    // console.error("Error in getServerData: ", error); // debug
    throw new Error("Error in getServerData: ", { cause: error });
  }
};

export const getNodeData = async (): Promise<NodeData[]> => {
  const { accessTicket, csrfToken } = await getAccessTicket();

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.PROXMOX_API_URL}/nodes`,
    headers: {
      CSRFPreventionToken: csrfToken,
      Cookie: `PVEAuthCookie=${accessTicket}`,
    },
  };

  try {
    const res = await axios.request(config);
    const data = res.data.data;

    return data;
  } catch (error) {
    // console.error("Error in getNodeData: ", error); // debug
    throw new Error("Error in getNodeData: ", { cause: error });
  }
};
