"use client";

import { LucideIcon } from "lucide-react";

import { ElementRef, useRef, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { serverAction } from "@/lib/services/server-service";
import { useSession } from "@/providers/session-provider";
import { ServerData, ServerType } from "@/types";

interface ServerActionButtonsProps {
  label: string;
  action: string;
  icon: LucideIcon;
  color: string;
  fill?: boolean;
  server: ServerData;
  type: ServerType;
  trigger: "button" | "dropdown";
}

interface IconProps {
  icon: LucideIcon;
  color: string;
  fill?: boolean;
  label: string;
}

const Icon = ({ icon: Icon, color, fill }: IconProps) => {
  return (
    <Icon
      style={{ fill: fill ? "currentcolor" : "none" }}
      className={`h-4 w-4 sm:mr-2 text-${color} transition-all group-hover:text-text`}
    />
  );
};

export const ServerActionButtons = ({
  label,
  action,
  icon,
  color,
  fill,
  server,
  type,
  trigger,
}: ServerActionButtonsProps) => {
  const { user } = useSession();
  let role = "user";
  role = user?.role as string;

  const { toast } = useToast();
  const closeRef = useRef<ElementRef<"button">>(null);
  const [isPending, startTransition] = useTransition();

  let isDisabled = false;
  if (
    (action === "start" && server.status === "running") ||
    (["shutdown", "stop", "reboot"].includes(action) &&
      server.status === "stopped") ||
    role !== "admin" ||
    isPending
  ) {
    isDisabled = true;
  }

  const onClick = () => {
    startTransition(() => {
      serverAction({ type: type, action: action, vmid: server.vmid });
      toast({
        title: `${label}ing server: ${server.name}`,
      });
      closeRef?.current?.click?.();
    });
  };

  return action !== "start" ? (
    <>
      <Dialog>
        <DialogTrigger asChild>
          {trigger === "button" ? (
            <Button
              disabled={isDisabled}
              variant="outline"
              className={`text-${color} group`}
            >
              <Icon icon={icon} color={color} fill={fill} label={label} />
              <p className="hidden sm:block">{label}</p>
            </Button>
          ) : trigger === "dropdown" ? (
            <Button
              disabled={isDisabled}
              variant="ghost"
              size="sm"
              className={`group relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 text-${color}`}
            >
              <Icon icon={icon} color={color} fill={fill} label={label} />
              <p className="w-full text-left">{label}</p>
            </Button>
          ) : null}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              You are about to {action} {server.name}
            </DialogTitle>
            <DialogDescription>Are you sure?</DialogDescription>
          </DialogHeader>
          <div className="flex justify-between">
            <Button
              disabled={isDisabled}
              variant="outline"
              onClick={onClick}
              className={`text-${color} group`}
            >
              <Icon icon={icon} color={color} fill={fill} label={label} />
              {label}
            </Button>
            <DialogClose ref={closeRef} asChild>
              <Button type="button" variant="ghost" autoFocus>
                Cancel
              </Button>
            </DialogClose>
          </div>
        </DialogContent>
      </Dialog>
    </>
  ) : (
    <>
      {trigger === "button" ? (
        <Button
          disabled={isDisabled}
          onClick={onClick}
          variant="outline"
          className={`text-${color} group`}
        >
          <Icon icon={icon} color={color} fill={fill} label={label} />
          <p className="hidden sm:block">{label}</p>
        </Button>
      ) : trigger === "dropdown" ? (
        <DropdownMenuItem
          disabled={isDisabled}
          onClick={onClick}
          className={`group flex items-center text-${color}`}
        >
          <Icon icon={icon} color={color} fill={fill} label={label} />
          {label}
        </DropdownMenuItem>
      ) : null}
    </>
  );
};
