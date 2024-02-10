"use client";

import {
  Cpu,
  MemoryStick,
  Play,
  PowerIcon,
  RefreshCcw,
  Square,
} from "lucide-react";

import { RefreshButton } from "@/components/refresh-button";
import { cn } from "@/lib/utils";
import { ServerData } from "@/types/types";

import { ActionButton } from "./action-buttons";
import { HeaderCard } from "./header-card";

interface HeaderProps {
  server: ServerData;
}

export const Header = ({ server }: HeaderProps) => {
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

  const serverAction = [
    {
      label: "Start",
      action: "start",
      icon: Play,
      color: "success",
      fill: true,
    },
    {
      label: "Shutdown",
      action: "shutdown",
      icon: PowerIcon,
      color: "alert",
    },
    {
      label: "Stop",
      action: "stop",
      icon: Square,
      color: "alert",
      fill: true,
    },
    {
      label: "Reboot",
      action: "reboot",
      icon: RefreshCcw,
      color: "warning",
    },
  ];

  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold">{server.name}</h2>
          <small
            className={cn(
              "text-xs capitalize",
              server.status === "running" ? "text-success" : "text-alert",
            )}
          >
            {server.status}
          </small>
        </div>

        <div className="flex items-center space-x-2">
          {serverAction.map((action) => (
            <ActionButton
              key={action.label}
              label={action.label}
              action={action.action}
              icon={action.icon}
              color={action.color}
              fill={action.fill}
              server={server}
            />
          ))}

          <RefreshButton />
        </div>
      </div>

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
