const myHeaders = new Headers();
myHeaders.append(
  "CSRFPreventionToken",
  "64E94183:vN8xfhYUG0PL5psdVCTk8ZPjyjh6fE1G8dn4S+apfmc",
);
myHeaders.append(
  "Cookie",
  "PVEAuthCookie=PVE:API@pve:659A06D8::XsO8jhf2K7ndwZsPbw4PK6k6XFj905WrGd7hzHcowsJk2JXjWODz/XbI1aRlJrLZ8dOkVu4RVc85lCcWVaETbIqcB75tv/QZaEN85ms986FqdCTAJ4lLtJqej/LzS0uL7KZzNH/dOKw+ekVygHOz/dLxfc8T8QdxP8jyTEybWFbY4nTtoHjtqa1+lZIUlN976vwIcERRUqCMK6FoF16+mcKpLG+oOUVI/nCNrIyTIw7v8qOteEGsmw/ZnA2kTt61Hk2hDl8YwaWSkIzAc5db+avjDytBwWNXSj2XjldtGWTXqRtMiaMjB/HkdrVvAzetfE0XI/dvG49yv0Wcfe+xiQ==",
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
    console.error("Error fetching data:", error); // debug
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
      console.error("Error fetching data:", error); // debug
      throw new Error(
        "There was a problem refreshing server data! Please refresh the page, or try again later.",
        { cause: error },
      );
    }
  }, 300000); // 30 seconds = 30000 // 5 min = 300000
};

export { serverData, startInterval };
