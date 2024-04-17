"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { TableColumnHeader } from "@/components/column-header";
import { Checkbox } from "@/components/ui/checkbox";

import { SupportTicketActions } from "./admin-support-ticket-actions";

export type SupportTicket = {
  id: string;
  senderUsername: string;
  senderName: string;
  senderEmail: string;
  subject: string;
  message: string;
  status: "open" | "closed" | "pending";
  createdAt: Date;
  updatedAt: Date;
  sentAt: Date;
};

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
          : row.getValue("status") === "closed"
            ? "success"
            : "warning";

      return (
        <div className={`font-medium capitalize text-${textColor}`}>
          {row.getValue("status")}
        </div>
      );
    },
  },
  {
    accessorKey: "subject",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Subject" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("subject")}</div>;
    },
  },
  {
    accessorKey: "message",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Message" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("message")}</div>;
    },
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
    id: "actions",
    cell: ({ row }) => {
      return <SupportTicketActions row={row} />;
    },
  },
];
