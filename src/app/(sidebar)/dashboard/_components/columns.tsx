"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ServerData } from "@/types/types";

import { ServerTableColumnHeader } from "./column-header";

export const columns: ColumnDef<ServerData>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <ServerTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      return (
        <div
          className={cn(
            "font-medium",
            row.getValue("status") === "running"
              ? "text-success"
              : "text-alert",
          )}
        >
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <ServerTableColumnHeader column={column} title="Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium capitalize">{row.getValue("name")}</div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "cpu",
    header: ({ column }) => (
      <ServerTableColumnHeader column={column} title="CPU" />
    ),
    cell: ({ row }) => {
      const cpu = (parseFloat(row.getValue("cpu")) * 100).toFixed(2);

      const cpuUsageClassName =
        parseFloat(cpu) <= 50
          ? "text-success"
          : parseFloat(cpu) >= 90
            ? "text-alert"
            : parseFloat(cpu) > 50
              ? "text-warning"
              : "text-text";

      return (
        <div className={cpuUsageClassName}>
          {row.getValue("status") === "running" ? (
            <>
              {cpu}%
              <span className="text-muted-foreground">
                {" "}
                / {row.getValue("cpus")} CPU(s)
              </span>
            </>
          ) : (
            <p className="text-text">-</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "cpus",
    header: ({ column }) => (
      <ServerTableColumnHeader
        column={column}
        title="CPUs"
        className="hidden"
      />
    ),
    cell: () => {
      return null;
    },
  },
  {
    accessorKey: "mem",
    header: ({ column }) => (
      <ServerTableColumnHeader column={column} title="Memory" />
    ),
    cell: ({ row }) => {
      const memoryUsagePercentage =
        (parseFloat(row.getValue("mem")) / parseFloat(row.getValue("maxmem"))) *
        100;
      const mem = (parseFloat(row.getValue("mem")) / 1024 ** 2).toFixed(2);
      const maxmem = (parseFloat(row.getValue("maxmem")) / 1024 ** 3).toFixed(
        2,
      );

      const memoryUsageClassName =
        memoryUsagePercentage <= 50
          ? "text-success"
          : memoryUsagePercentage >= 90
            ? "text-alert"
            : memoryUsagePercentage > 50
              ? "text-warning"
              : "text-text";

      return (
        <div className={memoryUsageClassName}>
          {row.getValue("status") === "running" ? (
            <>
              {mem} MB
              <span className="text-muted-foreground"> / {maxmem} GB(s)</span>
            </>
          ) : (
            <p className="text-text">-</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "maxmem",
    header: ({ column }) => (
      <ServerTableColumnHeader
        column={column}
        title="Max Memory"
        className="hidden"
      />
    ),
    cell: () => {
      return null;
    },
  },
  {
    accessorKey: "uptime",
    header: ({ column }) => (
      <ServerTableColumnHeader column={column} title="Uptime" />
    ),
    cell: ({ row }) => {
      const uptime = (row: any) => {
        const hours = Math.floor(row.getValue("uptime") / 3600);
        const minutes = Math.floor((row.getValue("uptime") % 3600) / 60);
        const seconds = row.getValue("uptime") % 60;

        return `
        ${hours}h
        ${minutes}m
        ${seconds}s
        `;
      };

      return (
        <div className={cn()}>
          {row.getValue("status") === "running" ? (
            <>{uptime(row)}</>
          ) : (
            <p className="text-text">-</p>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "vmid",
    header: ({ column }) => (
      <ServerTableColumnHeader column={column} title="VM ID" />
    ),
    cell: ({ row }) => {
      return <div className={cn()}>{row.getValue("vmid")}</div>;
    },
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const server = row.original;

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
              onClick={() =>
                navigator.clipboard.writeText(server.vmid.toString())
              }
            >
              Copy VM ID
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
