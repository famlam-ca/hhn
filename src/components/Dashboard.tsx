import { getServerSession } from "next-auth";
import { Cpu, Database, MemoryStick } from "lucide-react";

import { authOptions } from "@/lib/auth/authOptions";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserAccountNav from "@/components/navigation/UserAccountNav";
import Box from "@/components/Box";
import Progressbar from "@/components/CircularProgressbar";
import ServerTable from "./ServerTable";
import MobileNav from "./navigation/MobileNav";

const Dashboard = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user!;

  return (
    <MaxWidthWrapper className="min-w-full">
      {/* Header */}
      <div className="flex items-center justify-between">
        <MobileNav isAuth={!!user} />
        <div>
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
          <small className="text-xs text-muted">
            Server Hardware Statistics
          </small>
        </div>
        <UserAccountNav
          name={!user.name ? "Username" : `${user.name}`}
          full_name={!user.full_name ? "User" : `${user.full_name}`}
          email={user.email ?? ""}
          imageUrl={user.image ?? ""}
          role={user.role ?? ""}
        />
      </div>

      {/* Hardware Summary Cards */}
      <div className="flex flex-col gap-2 md:gap-4 lg:flex-row">
        {/* CPU */}
        <Box className="mt-4 w-full bg-foreground p-7 shadow-lg hover:shadow-none">
          <Cpu className="h-10 w-10 rounded-full bg-primary p-2" />
          <div className="flex items-center justify-between">
            <h3 className="font-semibold">CPU Usage</h3>
            <div className="h-28 w-28">
              <Progressbar />
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
              <Progressbar />
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
              <Progressbar />
            </div>
          </div>
          <small className="text-muted">Last 5 min</small>
        </Box>
      </div>

      {/* Servers */}
      <div className="my-8">
        <h2 className="mb-3 text-2xl font-semibold">Servers</h2>
        <Box className="w-full bg-foreground p-2 shadow-lg hover:shadow-none sm:p-7">
          <ServerTable />
        </Box>
      </div>
    </MaxWidthWrapper>
  );
};

export default Dashboard;
