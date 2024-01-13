import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { serverData } from "@/server/proxmox";
import { ServerData } from "@/types/types";

export const ServerTable = async () => {
  try {
    const { serverDataList, formatUptime } = await serverData();

    return (
      <Table className="rounded-lg bg-foreground">
        <TableHeader>
          <TableRow className="font-semibold">
            <TableHead className="max-lg:hidden">Status</TableHead>
            <TableHead>Server Name</TableHead>
            <TableHead>CPU Usage</TableHead>
            <TableHead>Memory Usage</TableHead>
            <TableHead className="max-lg:hidden">Uptime</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {serverDataList.map((serverData: ServerData) => {
            const data = {
              serverName: serverData.name,
              status: serverData.status,
              cpuUsage: (serverData.cpu * 100).toFixed(2),
              cpus: serverData.cpus,
              memoryUsage: (serverData.mem / 1024 ** 2).toFixed(2),
              maxMem: (serverData.maxmem / 1024 ** 3).toFixed(2),
              uptime: formatUptime(serverData.uptime),
            };

            const statusClassName =
              data.status === "running" ? "text-success" : "text-alert";

            const cpuUsageClassName =
              parseFloat(data.cpuUsage) <= 50
                ? "text-success"
                : parseFloat(data.cpuUsage) >= 90
                  ? "text-alert"
                  : parseFloat(data.cpuUsage) > 50
                    ? "text-warning"
                    : "text-text";

            const memoryUsagePercentage =
              (serverData.mem / serverData.maxmem) * 100;

            const memoryUsageClassName =
              memoryUsagePercentage <= 50
                ? "text-success"
                : memoryUsagePercentage >= 90
                  ? "text-alert"
                  : memoryUsagePercentage > 50
                    ? "text-warning"
                    : "text-text";

            return (
              <TableRow key={serverData.vmid}>
                <TableCell className={`capitalize ${statusClassName}`}>
                  {data.status}
                </TableCell>

                <TableCell className="capitalize">{data.serverName}</TableCell>

                <TableCell className={cpuUsageClassName}>
                  {data.status === "running" ? (
                    <>
                      {data.cpuUsage}%
                      <span className="text-muted-foreground">
                        {" "}
                        / {data.cpus} CPU(s)
                      </span>
                    </>
                  ) : (
                    <p className="text-text">-</p>
                  )}
                </TableCell>

                <TableCell className={memoryUsageClassName}>
                  {data.status === "running" ? (
                    <>
                      {data.memoryUsage} MB
                      <span className="text-muted-foreground">
                        {" "}
                        / {data.maxMem} GB
                      </span>
                    </>
                  ) : (
                    <p className="text-text">-</p>
                  )}
                </TableCell>

                <TableCell className="max-lg:hidden">
                  {data.status === "running" ? (
                    <>{data.uptime}</>
                  ) : (
                    <p className="text-text">-</p>
                  )}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  } catch (error) {
    console.error(error); // debug
    return <div>Error fetching server data. Please try again later.</div>;
  }
};
