"use client";

import { LucideIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";

import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { serverAction } from "@/server/proxmox/server-action";
import { ServerData, ServerType } from "@/types/types";

interface ActionButtonProps {
  label: string;
  action: string;
  icon: LucideIcon;
  color: string;
  fill?: boolean;
  server: ServerData;
}

export const ActionButton = ({
  label,
  action,
  icon: Icon,
  color,
  fill,
  server,
}: ActionButtonProps) => {
  const params = useSearchParams();
  const type = params.get("type") as ServerType;

  let isDisabled = false;
  if (
    (action === "start" && server.status === "running") ||
    (["shutdown", "stop", "reboot"].includes(action) &&
      server.status === "stopped")
  ) {
    isDisabled = true;
  }

  return (
    <Button
      disabled={isDisabled}
      onClick={() => {
        serverAction({ action: action, vmid: server.vmid });
        toast({
          title: `${label}ing server: ${server.name}`,
        });
      }}
      variant="outline"
      className={`text-${color} group`}
    >
      <Icon
        className={cn(
          `mr-2 h-4 w-4 text-${color} transition-all group-hover:text-text`,
          fill && `fill-${color} group-hover:fill-text`,
        )}
      />
      {label}
    </Button>
  );
};
