"use client";

import {
  Copy,
  MoreHorizontal,
  Play,
  Power,
  RefreshCcw,
  Square,
  Terminal,
} from "lucide-react";
import Link from "next/link";

import { ServerActionButtons } from "@/components/server-action-buttons";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ServerData, ServerType } from "@/types";

interface ServerActionsProps {
  server: ServerData;
  type: ServerType;
}

export const ServerActions = ({ server, type }: ServerActionsProps) => {
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
      icon: Power,
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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="none" className="h-8 w-8">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="text-muted-foreground">
          Actions
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => navigator.clipboard.writeText(server.vmid.toString())}
          className="flex items-center"
        >
          <Copy className="mr-2 h-4 w-4" />
          Copy VM ID
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href={`/dashboard/server/${type}/${server.vmid}`}>
            <Terminal className="mr-2 h-4 w-4" />
            View server
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

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
            trigger="dropdown"
          />
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
