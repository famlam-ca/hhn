import { ServerData, serverType } from "@/types/types";

import { fetchAccessTicket } from "./request-access-ticket";

interface Response {
  csrfToken: string;
  accessTicket: string;
}

const fetchServerData = async (type: serverType) => {
  const url = `${process.env.PROXMOX_API_URL}nodes/pve/${type}`;

  const res = (await fetchAccessTicket()) as Response;

  const myHeaders = new Headers();
  myHeaders.append("CSRFPreventionToken", res.csrfToken);
  myHeaders.append("Cookie", `PVEAuthCookie=${res.accessTicket}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(url, requestOptions);
    const { data: serverDataList } = (await res.json()) as {
      data: ServerData[];
    };

    if (!Array.isArray(serverDataList)) {
      throw new Error("Invalid data format", {
        cause: "Invalid data format",
      });
    }

    serverDataList.sort((a, b) => {
      const vmidA = a.vmid;
      const vmidB = b.vmid;
      return vmidA - vmidB;
    });

    const formatUptime = (uptimeInSeconds: any) => {
      const hours = Math.floor(uptimeInSeconds / 3600);
      const minutes = Math.floor((uptimeInSeconds % 3600) / 60);
      const seconds = uptimeInSeconds % 60;

      return `
        ${hours}h
        ${minutes}m
        ${seconds}s
        `;
    };

    return { serverDataList, formatUptime };
  } catch (error) {
    console.error("Error in fetchServerData: ", error); // debug
    throw new Error("Error in fetchServerData: ", { cause: error });
  }
};

export const serverData = async (type: serverType) => {
  try {
    const data = await fetchServerData(type);
    return data;
  } catch (error) {
    console.error("Error in serverData: ", error); // debug
    throw new Error("Error in serverData: ", { cause: error });
  }
};

const fetchHostData = async () => {
  const url = "https://pve.famlam.ca/api2/json/nodes/pve/status";

  const res = (await fetchAccessTicket()) as Response;

  const myHeaders = new Headers();
  myHeaders.append("CSRFPreventionToken", res.csrfToken);
  myHeaders.append("Cookie", `PVEAuthCookie=${res.accessTicket}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  try {
    const res = await fetch(url, requestOptions);
    const { data: hostDataList } = await res.json();

    return hostDataList;
  } catch (error) {
    console.error("Error in fetchHostData: ", error); // debug
    throw new Error("Error whilst trying to run fetchHostData: ", {
      cause: error,
    });
  }
};

export const hostData = async () => {
  try {
    const data = await fetchHostData();

    return data;
  } catch (error) {
    console.error("Error in hostData: ", error); // debug
    throw new Error("Error whilst trying to run hostData", {
      cause: error,
    });
  }
};
