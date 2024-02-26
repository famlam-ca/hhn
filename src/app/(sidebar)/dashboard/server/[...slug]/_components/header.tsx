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
import { ServerData, ServerType } from "@/types/types";

import { ServerActionButtons } from "@/components/server-action-buttons";
import { HeaderCard } from "./header-card";

interface HeaderProps {
  server: ServerData;
  type: ServerType;
}

export const Header = ({ server, type }: HeaderProps) => {
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

  const actions = [
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
      <div className="flex flex-col justify-between sm:flex-row sm:items-center">
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

        <div className="flex items-center max-sm:justify-between sm:space-x-2">
          <div className="space-x-2">
            {actions.map((action) => (
              <ServerActionButtons
                key={action.label}
                label={action.label}
                action={action.action}
                icon={action.icon}
                color={action.color}
                fill={action.fill}
                server={server}
                type={type}
                trigger="button"
              />
            ))}
          </div>

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
