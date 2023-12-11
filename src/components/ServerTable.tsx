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
    "PVEAuthCookie=PVE:API@pve:657692E3::ac4MbD4F3izMlWAC4c/XMdPCU7PAw2Wb/UV0SWKmqt9tRt6vou39345cX8hKrSTboHToBfm+tLwQoZsm3F4spCJlGJyYRqwu/Z9Drus8qC6ERzH6j6R88L5M/oOnqf/mXNg/5WAzwDOrkljBmq4dD9TSt7wdUTrDP0coIvAXXdaahyFBBnA+lF6Rg9YrG52J+RVINvixtH5Nia3y/rd4JcJ4WBGHn3pNppZfugoEECDdkg1+zdTWuiPzSCQuQK8pqsX9Ed1GVvU77pjvEZZQMPA3bTsvE8mhbNGEyKGFdlCqvpnUmbro9rJsVWcKXH0n0xxkMjiKu1So5WrvfqG6YA==",
  );

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow" as RequestRedirect,
  };

  const URL =
    "https://pve.famlam.ca/api2/json/nodes/pve/lxc/110/status/current";

  try {
    const response = await fetch(URL, requestOptions);
    const { data: serverData } = await response.json();

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

    const data = {
      serverName: serverData.name,
      status: serverData.status,
      cpuUsage: `${(serverData.cpu * 100).toFixed(2)}%`,
      memoryUsage: `${(serverData.mem / (1024 * 1024)).toFixed(2)}`,
      uptime: formatUptime(serverData.uptime),
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
            {/* NPM */}
            <TableRow key={data.serverName}>
              <TableCell
                className={
                  data.status === "running"
                    ? "capitalize text-success max-sm:hidden"
                    : "capitalize text-alert max-sm:hidden"
                }
              >
                {data.status}
              </TableCell>

              <TableCell className="capitalize">{data.serverName}</TableCell>
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

            {/* GS01 */}
            <TableRow key={data.serverName}>
              <TableCell
                className={
                  data.status === "running"
                    ? "capitalize text-success max-sm:hidden"
                    : "capitalize text-alert max-sm:hidden"
                }
              >
                {data.status}
              </TableCell>

              <TableCell className="capitalize">{data.serverName}</TableCell>
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

            {/* GS02 */}
            <TableRow key={data.serverName}>
              <TableCell
                className={
                  data.status === "running"
                    ? "capitalize text-success max-sm:hidden"
                    : "capitalize text-alert max-sm:hidden"
                }
              >
                {data.status}
              </TableCell>

              <TableCell className="capitalize">{data.serverName}</TableCell>
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

            {/* MailSrv */}
            <TableRow key={data.serverName}>
              <TableCell
                className={
                  data.status === "running"
                    ? "capitalize text-success max-sm:hidden"
                    : "capitalize text-alert max-sm:hidden"
                }
              >
                {data.status}
              </TableCell>

              <TableCell className="capitalize">{data.serverName}</TableCell>
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

            {/* WebSrv */}
            <TableRow key={data.serverName}>
              <TableCell
                className={
                  data.status === "running"
                    ? "capitalize text-success max-sm:hidden"
                    : "capitalize text-alert max-sm:hidden"
                }
              >
                {data.status}
              </TableCell>

              <TableCell className="capitalize">{data.serverName}</TableCell>
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

            {/* SQL-DB */}
            <TableRow key={data.serverName}>
              <TableCell
                className={
                  data.status === "running"
                    ? "capitalize text-success max-sm:hidden"
                    : "capitalize text-alert max-sm:hidden"
                }
              >
                {data.status}
              </TableCell>

              <TableCell className="capitalize">{data.serverName}</TableCell>
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

            {/* PrintSrv */}
            <TableRow key={data.serverName}>
              <TableCell
                className={
                  data.status === "running"
                    ? "capitalize text-success max-sm:hidden"
                    : "capitalize text-alert max-sm:hidden"
                }
              >
                {data.status}
              </TableCell>

              <TableCell className="capitalize">{data.serverName}</TableCell>
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

            {/* DNS */}
            <TableRow key={data.serverName}>
              <TableCell
                className={
                  data.status === "running"
                    ? "capitalize text-success max-sm:hidden"
                    : "capitalize text-alert max-sm:hidden"
                }
              >
                {data.status}
              </TableCell>

              <TableCell className="capitalize">{data.serverName}</TableCell>
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
          </TableBody>
        </Table>
      </>
    );
  } catch (error) {
    console.error("Error fetching server data:", error);
  }
};

export default ServerTable;
