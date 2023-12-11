import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const ServerTable = async () => {
  const myHeaders = new Headers();
  myHeaders.append(
    "CSRFPreventionToken",
    "64E94183:vN8xfhYUG0PL5psdVCTk8ZPjyjh6fE1G8dn4S+apfmc",
  );
  myHeaders.append(
    "Cookie",
    "PVEAuthCookie=PVE:API@pve:6576B5FB::E/K++PolK2l6GlcjhTWga0Rj4kT0rm0jUivtAF++kAfu4Jn81rV2dr6qrHEz2fl0LaxPe71i2+Ld3HrgC3NV0m1DOuHZea5MLCIE5j7pgnPSGxR4I3am9viysuOscQlsPDeMHY0M5p78xsUwnguQgcYG8kQopAkWGcP8V8V4pfq8YLwQfKGIDyOwjgBHqFynXo6hjF7QT31vS5l0oRFFmK3k35QwGGk+hkIdqnprf6ME44UELHb3LSVoibyt9AOfUWbZIPZQlumSyRjlZGdJ5bg0eabt6879pbeM/D+7EK+HXqZGuZ1Kixq9b3p7nOp24zlZu8dkjeLWpNA/oUcdQQ==",
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const URL = "https://pve.famlam.ca/api2/json/nodes/pve/lxc";

  try {
    const response = await fetch(URL, requestOptions);
    const { data: serverDataList } = await response.json();

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

    return (
      <>
        <Table>
          <TableHeader>
            <TableRow className="font-semibold">
              <TableHead className="max-sm:hidden">Status</TableHead>
              <TableHead>Server Name</TableHead>
              <TableHead>CPU Usage</TableHead>
              <TableHead>Memory Usage</TableHead>
              <TableHead className="max-lg:hidden">Uptime</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {serverDataList.map((serverData: any) => {
              const data = {
                serverName: serverData.name,
                status: serverData.status,
                cpuUsage: `${(serverData.cpu * 100).toFixed(2)}`,
                memoryUsage: `${(serverData.mem / (1024 * 1024)).toFixed(2)}`,
                uptime: formatUptime(serverData.uptime),
              };

              return (
                <TableRow key={serverData.vmid}>
                  <TableCell
                    className={
                      data.status === "running"
                        ? "capitalize text-success max-sm:hidden"
                        : "capitalize text-alert max-sm:hidden"
                    }
                  >
                    {data.status}
                  </TableCell>

                  <TableCell className="capitalize">
                    {data.serverName}
                  </TableCell>

                  <TableCell
                    className={
                      parseFloat(data.cpuUsage) <= 50
                        ? "text-success"
                        : parseFloat(data.cpuUsage) > 50
                          ? "text-warning"
                          : parseFloat(data.cpuUsage) >= 75
                            ? "text-alert"
                            : "text-text"
                    }
                  >
                    {data.cpuUsage}
                  </TableCell>

                  <TableCell
                    className={
                      parseFloat(data.memoryUsage) <= 50 // 2048
                        ? "text-success"
                        : parseFloat(data.memoryUsage) > 50 // 4096
                          ? "text-warning"
                          : parseFloat(data.memoryUsage) >= 75 // 6144
                            ? "text-alert"
                            : "text-text"
                    }
                  >
                    {data.memoryUsage} MB
                  </TableCell>

                  <TableCell className="max-lg:hidden">{data.uptime}</TableCell>
                  <TableCell className="text-right text-primary max-lg:hidden"></TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </>
    );
  } catch (error) {
    console.error("Error fetching server data:", error);
  }
};

export default ServerTable;
