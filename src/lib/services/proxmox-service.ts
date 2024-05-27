"use server"

import axios from "axios"
import qs from "qs"

import { NodeData, ServerData, ServerType } from "@/types"

export const getAccessTicket = () => {
  const credentials = qs.stringify({
    username: process.env.PROXMOX_API_USERNAME,
    password: process.env.PROXMOX_API_PASSWORD,
  })

  const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${process.env.PROXMOX_API_URL}/access/ticket`,
    data: credentials,
  }

  return axios
    .request(config)
    .then((res) => {
      const { CSRFPreventionToken, ticket } = res.data.data
      return {
        csrfToken: CSRFPreventionToken,
        accessTicket: ticket,
      }
    })
    .catch((error: any) => {
      throw new Error("Failed to retrieve access ticket", { cause: error })
    })
}

export const getServerData = async (
  type: ServerType = "lxc",
): Promise<ServerData[]> => {
  const { accessTicket, csrfToken } = await getAccessTicket()

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.PROXMOX_API_URL}/nodes/${process.env.PROXMOX_DEFAULT_NODE}/${type}`,
    headers: {
      CSRFPreventionToken: csrfToken,
      Cookie: `PVEAuthCookie=${accessTicket}`,
    },
  }

  const addServerType = (data: ServerData[]) => {
    return data.map((server) => {
      if (!server.type) {
        server.type = "qemu"
      }
      return server
    })
  }

  try {
    const res = await axios.request(config)
    let data = res.data.data.sort(
      (a: { vmid: number }, b: { vmid: number }) => a.vmid - b.vmid,
    )

    data = addServerType(data) // add type to server

    return data
  } catch (error) {
    throw new Error("Error in getServerData: ", { cause: error })
  }
}

export const getNodeData = async (): Promise<NodeData[]> => {
  const { accessTicket, csrfToken } = await getAccessTicket()

  const config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${process.env.PROXMOX_API_URL}/nodes`,
    headers: {
      CSRFPreventionToken: csrfToken,
      Cookie: `PVEAuthCookie=${accessTicket}`,
    },
  }

  try {
    const res = await axios.request(config)
    const data = res.data.data

    return data
  } catch (error) {
    throw new Error("Error in getNodeData: ", { cause: error })
  }
}
