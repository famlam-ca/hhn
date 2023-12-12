import Skeleton from "react-loading-skeleton";

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
    "PVEAuthCookie=PVE:API@pve:6577FC87::GqGeqnz7ITI2uiv6mLhk8ghmJoCv0VTCYaN+3UuakQQ8GgaRgI7KTH7ViH8orlVAAQn0vL80Ri0GeRoVXSu440PX6F2b6Dbmvz67RHGOdR7OFnd2yiz3P7Q/c0r+yuK+bSIKRlbgdWGsNpv7FGvwMzu52cS75ZrxLxWIx0PADQKlg60hw71nRbKkrDVQm32Ozo6VLMaDme/Ah2lqUvB1Mv2DjDxemM1QKiFn/9CRSlRiISrsiv1sLmYkUcRT1S/tJADg/pODTfLnkszg1EEl2q4nFt89TWGIppyjAFPQ0ScxJlD6kR6KuqNjicetiU0GAPLdUXl5LSL/90NJva7nVg==",
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const URL = "https://pve.famlam.ca/api2/json/nodes/pve/lxc";

  try {
    const res = await fetch(URL, requestOptions);
    const { data: serverDataList } = await res.json();

    serverDataList.sort((a: any, b: any) => a.name.localeCompare(b.name));

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
            {!serverDataList ? (
              <Skeleton height={40} count={8} className="my-2" />
            ) : (
              <>
                {serverDataList.map((serverData: any) => {
                  const data = {
                    serverName: serverData.name,
                    status: serverData.status,
                    cpuUsage: `${(serverData.cpu * 100).toFixed(2)}`,
                    memoryUsage: `${(serverData.mem / (1024 * 1024)).toFixed(
                      2,
                    )}`,
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

                      <TableCell className="max-lg:hidden">
                        {data.uptime}
                      </TableCell>
                      <TableCell className="text-right text-primary max-lg:hidden"></TableCell>
                    </TableRow>
                  );
                })}
              </>
            )}
          </TableBody>
        </Table>
      </>
    );
  } catch (error) {
    console.error("Error fetching server data:", error);
  }
};

export default ServerTable;
