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
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/components/ui/use-toast";
import { serverAction } from "@/server/proxmox/server-action";
import { ServerData } from "@/types/types";

interface ServerActionsProps {
  server: ServerData;
}

export const ServerActions = ({ server }: ServerActionsProps) => {
  const { data: session } = useSession();
  const user = session?.user!;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
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
          <Link href={`/dashboard/server/${server.vmid}`}>
            <Terminal className="mr-2 h-4 w-4" />
            View server
          </Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={server.status === "running" || user.role !== "admin"}
          onClick={() => {
            serverAction({ action: "start", vmid: server.vmid });
            toast({
              title: `Starting server: ${server.name}`,
              duration: 2000,
            });
          }}
          className="group flex items-center text-success"
        >
          <Play className="mr-2 h-4 w-4 fill-success text-success transition-all group-hover:fill-text group-hover:text-text" />
          Start
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={server.status === "stopped" || user.role !== "admin"}
          onClick={() => {
            serverAction({ action: "shutdown", vmid: server.vmid });
            toast({
              title: `Shutting down server: ${server.name}`,
              duration: 2000,
            });
          }}
          className="flex items-center text-alert"
        >
          <Power className="mr-2 h-4 w-4" />
          Shutdown
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={server.status === "stopped" || user.role !== "admin"}
          onClick={() => {
            serverAction({ action: "stop", vmid: server.vmid });
            toast({
              title: `Stopping server: ${server.name}`,
              duration: 2000,
            });
          }}
          className="group flex items-center text-alert"
        >
          <Square className="mr-2 h-4 w-4 fill-alert text-alert transition-all group-hover:fill-text group-hover:text-text" />
          Stop
        </DropdownMenuItem>

        <DropdownMenuItem
          disabled={server.status === "stopped" || user.role !== "admin"}
          onClick={() => {
            serverAction({ action: "reboot", vmid: server.vmid });
            toast({
              title: `Rebooting server: ${server.name}`,
              duration: 2000,
            });
          }}
          className="flex items-center text-warning"
        >
          <RefreshCcw className="mr-2 h-4 w-4" />
          Reboot
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
