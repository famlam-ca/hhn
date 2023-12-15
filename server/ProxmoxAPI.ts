const myHeaders = new Headers();
myHeaders.append(
  "CSRFPreventionToken",
  "64E94183:vN8xfhYUG0PL5psdVCTk8ZPjyjh6fE1G8dn4S+apfmc",
);
myHeaders.append(
  "Cookie",
  "PVEAuthCookie=PVE:API@pve:657CBE5C::YgegEZx8Ekm5YUP7OCx424O7zFRLyktNdEm/ObknTx+zkOKlfcYyQ262D+paCN/rfZ9cmfTTmkqK/qwi+PV3jmDIcnFv+2zS2lH8qi/zrAcjxiZXsNpSQ4pFy8gpPyaDCgtt/Wf+qbhOoJ3vUfwNbeivRw9NU2ehQeUcDB/JsFrwAsjFhXlMRvJsEuS7MHaYNvQHyo+WBvCAH1JmB+rv6MenGBdcqL1p0SsgT5Q9wil3n1s0zzVIixvYH61kcVBdxIvwL4ht3F78vxjYIHzpE7j5jzA6Ac5UaS28T7XqOJ0ynmYCPaegfPfWZH1VlP9IJZo3Y6KdMH/1Skep6UY4mw==",
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

    console.log("Server Data List:", serverDataList); // debug

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
    console.log("Server Data List:", data.serverDataList); // debug
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
