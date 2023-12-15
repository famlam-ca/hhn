import { Cpu, Database, MemoryStick } from "lucide-react";

import Box from "@/components/Box";
import ServerStat from "./ServerStat";

const ServerCards = () => {
  return (
    <>
      {/* CPU */}
      <Box className="mt-4 w-full bg-foreground p-7 shadow-lg hover:shadow-none">
        <Cpu className="h-10 w-10 rounded-full bg-primary p-2" />
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">CPU Usage</h3>
          <div className="h-28 w-28">
            <ServerStat />
          </div>
        </div>
        <small className="text-muted">Last 5 min</small>
      </Box>

      {/* Memory */}
      <Box className="mt-4 w-full bg-foreground p-7 shadow-lg hover:shadow-none">
        <MemoryStick className="h-10 w-10 rounded-full bg-alert p-2" />
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Memory Usage</h3>
          <div className="h-28 w-28">
            <ServerStat />
          </div>
        </div>
        <small className="text-muted">Last 5 min</small>
      </Box>

      {/* Disk */}
      <Box className="mt-4 w-full bg-foreground p-7 shadow-lg hover:shadow-none">
        <Database className="h-10 w-10 rounded-full bg-success p-2" />
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Disk Usage</h3>
          <div className="h-28 w-28">
            <ServerStat />
          </div>
        </div>
        <small className="text-muted">Last 5 min</small>
      </Box>
    </>
  );
};

export default ServerCards;
