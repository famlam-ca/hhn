"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { format } from "date-fns";
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

export const columns: ColumnDef<Users>[] = [
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
    accessorKey: "username",
    header: () => <div>Username</div>,
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("username")}</div>;
    },
  },
  {
    accessorKey: "first_name",
    header: () => <div>First Name</div>,
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
    header: () => <div>Last Name</div>,
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "role",
    header: () => <div>Role</div>,
    cell: ({ row }) => {
      return (
        <div className="font-medium capitalize">{row.getValue("role")}</div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: () => <div>Updated at</div>,
    cell: ({ row }) => {
      const createdAt: Date = row.getValue("createdAt") as Date;

      const formattedDate = format(createdAt, "dd/MM/yyyy");
      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "updatedAt",
    header: () => <div>Updated at</div>,
    cell: ({ row }) => {
      const updatedAt: Date = row.getValue("updatedAt") as Date;

      const formattedDate = format(updatedAt, "dd/MM/yyyy");
      return <div className="font-medium">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

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
              onClick={() => navigator.clipboard.writeText(user.id)}
            >
              Copy user ID
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/admin/${user.username}/edit`}>Edit user</Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem asChild>
              <Link href={`/${user.username}`}>View profile</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
