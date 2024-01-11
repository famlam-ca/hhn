"use server";

const myHeaders = new Headers();
myHeaders.append(
  "CSRFPreventionToken",
  "64E94183:vN8xfhYUG0PL5psdVCTk8ZPjyjh6fE1G8dn4S+apfmc",
);
myHeaders.append(
  "Cookie",
  "PVEAuthCookie=PVE:API@pve:659F54BD::HwiRFwDyc/+Mnz+MvEfwC4dLlmryHgtTAM9IDp6AGG/XwNZwiCNR+wJ9UchM/1+JNTr+PXExcVlM1tYAE7NakPOADnUK2l0YLu9PQ/dSQqhP2Tx9gtwUtZ7l8cRlG1IaU//XjpREdnaZImPt9+3nsAHofs+ZqyB59saqgALIUOqysHFpXypIrNrCvsH6lcWO0rsR786kkla55uCT/4dRNwiO6M4uZM05JCYM5jzkYyLw8/F7iLf6xajBNtymhLVAZNVIY2ks4T6kZ0ya6xTy1dpwG9dVfWLUZufdwteyZO2no92Xd9lbmxBFekRaitjPmuwH2wF2lHgPTtqFQVhPDg==",
);

const requestOptions = {
  method: "GET",
  headers: myHeaders,
  redirect: "follow" as RequestRedirect,
};

const fetchServerData = async (url: string) => {
  try {
    const res = await fetch(url, requestOptions);
    const { data: serverDataList } = await res.json();

    // console.log("Server Data List:", serverDataList); // debug

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
    throw new Error("There was a problem fetching data from the server!", {
      cause: error,
    });
  }
};

const serverData = async (url: string) => {
  try {
    const data = await fetchServerData(url);
    // console.log("Server Data List:", data.serverDataList); // debug
    return data;
  } catch (error) {
    throw new Error("There was a problem fetching data from the server!", {
      cause: error,
    });
  }
};

const startInterval = (url: string) => {
  setInterval(async () => {
    try {
      const newData = await serverData(url);

      return newData;
    } catch (error) {
      throw new Error(
        "There was a problem refreshing server data! Please refresh the page, or try again later.",
        { cause: error },
      );
    }
  }, 300000); // 30 seconds = 30000 // 5 min = 300000
};

export { serverData, startInterval };
