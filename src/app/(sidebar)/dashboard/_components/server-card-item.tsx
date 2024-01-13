import { LucideIcon } from "lucide-react";

import Box from "@/components/box";

import { ServerStat } from "./server-stat";

interface ServerCardItemProps {
  label: string;
  icon: LucideIcon;
  bgColor: string;
}

export const ServerCardItem = ({
  label,
  icon: Icon,
  bgColor,
}: ServerCardItemProps) => {
  return (
    <Box className="mt-4 w-full bg-foreground p-6 shadow-lg hover:shadow-none">
      <Icon className={`h-10 w-10 rounded-full p-2 ${bgColor}`} />
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{label}</h3>
        <ServerStat />
      </div>
      <small className="text-muted">Last 5 min</small>
    </Box>
  );
};
