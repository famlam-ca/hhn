const myHeaders = new Headers();
myHeaders.append(
  "CSRFPreventionToken",
  "64E94183:vN8xfhYUG0PL5psdVCTk8ZPjyjh6fE1G8dn4S+apfmc",
);
myHeaders.append(
  "Cookie",
  "PVEAuthCookie=PVE:API@pve:659B10AD::gNmV2FtNuuE360osQxRj88z1cNBJ6I0yYdrRtxhZl9b3unbQYIXub/2iBMAhn5XelyTiJEPlUmTDPyskLDUlO1Q+RRHeAN32fkJYm3XJi7DaM50EiRIq1KT7m4Y8usvWdwX7+MRNMx85437zLp+vQDqhcWFrF6hxjvtrD9w2VLDITL+wsFKnGVeNaHd6BnnzZcWFWY6f3rXWo81WsgeJf2FGRFQvDO0FJUuT4Hs+lMC6bJWjwJuCHCA3tVJbV1h8jOPKGXgyducegHYKZ1n4J4Qsr0lFTejAPc/8t8fczZ8GkwHxWBHPIwIaJs872TnS+Q8x5Tygp36KGUs26x5ilA==",
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
