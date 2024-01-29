import { Cpu, MemoryStick } from "lucide-react";

import { ServerData } from "@/types/types";

import { HeaderCard } from "./header-card";

interface HeaderProps {
  server: ServerData;
}

export const Header = async ({ server }: HeaderProps) => {
  const serverInfo = [
    {
      label: "CPU Usage",
      icon: Cpu,
      color: "bg-primary",
      value: (server.cpu * 100).toFixed(2),
      maxValue: `${server.cpus} CPU(s)`,
    },
    {
      label: "Memory Usage",
      icon: MemoryStick,
      color: "bg-alert",
      value: ((server.mem / server.maxmem) * 100).toFixed(2),
      maxValue: `${(server.maxmem / 1024 ** 3).toFixed(2)} GB`,
    },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold capitalize">{server.name}</h2>

      <div className="flex flex-col gap-2 sm:gap-4 xl:flex-row">
        {serverInfo.map((info) => (
          <HeaderCard
            key={info.label}
            label={info.label}
            icon={info.icon}
            color={info.color}
            value={info.value}
            maxValue={info.maxValue}
          />
        ))}
      </div>
    </div>
  );
};
