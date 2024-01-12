import { fetchAccessTicket } from "./request-access-ticket";

interface Response {
  csrfToken: string;
  accessTicket: string;
}

const fetchServerData = async (url: string) => {
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
    const { data: serverDataList } = await res.json();

    if (!Array.isArray(serverDataList)) {
      throw new Error("Invalid server data format");
    }

    serverDataList.sort((a, b) => {
      const nameA = a.name?.toLowerCase() || "";
      const nameB = b.name?.toLowerCase() || "";
      return nameA.localeCompare(nameB);
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

const serverData = async (url: string) => {
  try {
    const data = await fetchServerData(url);
    return data;
  } catch (error) {
    console.error("Error in serverData: ", error); // debug
    throw new Error("Error in serverData: ", { cause: error });
  }
};

const startInterval = (url: string, intervalTime: number = 300000) => {
  setInterval(async () => {
    try {
      const newData = await serverData(url);
    } catch (error) {
      console.error("Error refreshing server data:", error); // debug
    }
  }, intervalTime);
};

export { serverData, startInterval };
