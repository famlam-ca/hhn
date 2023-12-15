import Box from "../Box";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "../ui/Skeleton";
import { ServerData } from "@/types/types";
import { serverData, startInterval } from "../../../server/ProxmoxAPI";

const ServerTable = async () => {
  const URL = "https://pve.famlam.ca/api2/json/nodes/pve/lxc";

  try {
    const { serverDataList, formatUptime } = await serverData(URL);

    startInterval(URL);

    return (
      <Box className="w-full bg-foreground p-2 shadow-lg hover:shadow-none sm:p-7">
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
            <>
              {serverDataList.map((serverData: ServerData) => {
                const data = {
                  serverName: serverData.name,
                  status: serverData.status,
                  cpuUsage: `${(serverData.cpu * 100).toFixed(2)}`,
                  memoryUsage: `${(serverData.mem / (1024 * 1024)).toFixed(2)}`,
                  uptime: formatUptime(serverData.uptime),
                };

                return (
                  <TableRow key={serverData.vmid}>
                    {!serverDataList ? ( // dynamically render skeletons
                      <>
                        <TableCell>
                          <Skeleton className="h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5" />
                        </TableCell>
                        <TableCell>
                          <Skeleton className="h-5" />
                        </TableCell>
                      </>
                    ) : (
                      <>
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
                      </>
                    )}
                  </TableRow>
                );
              })}
            </>
          </TableBody>
        </Table>
      </Box>
    );
  } catch (error) {
    console.error("Error fetching server data:", error); // debug
    return null;
  }
};

export default ServerTable;
