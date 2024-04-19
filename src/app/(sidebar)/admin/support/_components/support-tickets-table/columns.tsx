"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { TableColumnHeader } from "@/components/column-header";
import { Checkbox } from "@/components/ui/checkbox";
import { SupportTicket } from "@/types";

import { SupportTicketActions } from "./admin-support-ticket-actions";

export const supportTicketColumns: ColumnDef<SupportTicket>[] = [
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
      const textColor =
        row.getValue("status") === "open"
          ? "alert"
          : row.getValue("status") === "resolved"
            ? "success"
            : row.getValue("status") === "pending"
              ? "warning"
              : "muted-foreground";

      return (
        <div className={`font-medium capitalize text-${textColor}`}>
          {row.getValue("status")}
        </div>
      );
    },
    enableHiding: false,
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => {
      return (
        <div className="line-clamp-1 font-medium">
          {row.getValue("subject")}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "message",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Message" />
    ),
    cell: ({ row }) => {
      return (
        <div className="line-clamp-1 font-medium">
          {row.getValue("message")}
        </div>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "senderEmail",
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("senderEmail")}</div>;
    },
  },
  {
    accessorKey: "senderUsername",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium">{row.getValue("senderUsername")}</div>
      );
    },
  },
  {
    accessorKey: "senderName",
    header: ({ column }) => <TableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("senderName")}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt") as Date;

      const formattedDate = format(createdAt, "dd/MM/yyyy");
      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ row }) => {
      const updatedAt: Date = row.getValue("updatedAt") as Date;

      const formattedDate = format(updatedAt, "dd/MM/yyyy");
      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "sentAt",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Sent At" />
    ),
    cell: ({ row }) => {
      const sentAt: Date = row.getValue("sentAt") as Date;

      const formattedDate = format(sentAt, "dd/MM/yyyy");
      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "id",
    header: ({ column }) => <TableColumnHeader column={column} title="Id" />,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("id")}</div>;
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    accessorKey: "details",
    header: ({ column }) => {
      return <TableColumnHeader column={column} title="Details" />;
    },
    cell: ({ row }) => {
      return (
        <Link
          href={`/admin/support/${row.getValue("id")}`}
          className="flex items-center text-muted-foreground hover:text-text"
        >
          Details
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      );
    },
    enableHiding: false,
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <SupportTicketActions row={row} />;
    },
  },
];
