"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useSearchParams } from "next/navigation";

import { TableColumnHeader } from "@/components/column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { ServerData, ServerType } from "@/types";

import { ServerActions } from "./server/server-actions";

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
      <TableColumnHeader column={column} title="Status" />
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
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("name")}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "cpu",
    header: ({ column }) => <TableColumnHeader column={column} title="CPU" />,
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
      <TableColumnHeader column={column} title="CPUs" className="hidden" />
    ),
    cell: () => {
      return null;
    },
  },
  {
    accessorKey: "mem",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Memory" />
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
      <TableColumnHeader
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
      <TableColumnHeader column={column} title="Uptime" />
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
    header: ({ column }) => <TableColumnHeader column={column} title="VM ID" />,
    cell: ({ row }) => {
      return <div className={cn()}>{row.getValue("vmid")}</div>;
    },
    enableHiding: false,
  },
  {
    id: "actions",
    cell: function Cell({ row }) {
      const server = row.original;

      const searchParams = useSearchParams();
      const type = searchParams.get("type") as ServerType;

      return <ServerActions server={server} type={type} />;
    },
  },
];
