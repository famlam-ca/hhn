"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";

import { TableColumnHeader } from "@/components/column-header";
import { Checkbox } from "@/components/ui/checkbox";

import { AdminUserActions } from "./admin-user-actions";

export type Users = {
  id: string;
  username: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
  role: "user" | "superuser" | "admin";
  createdAt: Date;
  updatedAt: Date;
};

export const userColumns: ColumnDef<Users>[] = [
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
    accessorKey: "display_name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Display Name" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("display_name")}</div>;
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Username" />
    ),
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("username")}</div>;
    },
    enableHiding: false,
  },
  {
    accessorKey: "first_name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="First Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium capitalize">
          {row.getValue("first_name")}
        </div>
      );
    },
  },
  {
    accessorKey: "last_name",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Last Name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="font-medium capitalize">
          {row.getValue("last_name")}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <TableColumnHeader column={column} title="Email" />,
    enableHiding: false,
  },
  {
    accessorKey: "role",
    header: ({ column }) => <TableColumnHeader column={column} title="Role" />,
    cell: ({ row }) => {
      return (
        <div className="font-medium capitalize">{row.getValue("role")}</div>
      );
    },
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
  // TODO: Render user sessions
  {
    accessorKey: "sessions",
    header: ({ column }) => (
      <TableColumnHeader column={column} title="Sessions" />
    ),
    cell: ({ row }) => {
      const user = row.original;

      return <div className="font-medium">0</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return <AdminUserActions row={row} />;
    },
  },
];
