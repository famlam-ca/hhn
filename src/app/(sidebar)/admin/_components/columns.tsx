"use client";

import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { TableColumnHeader } from "@/components/column-header";
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
import {
  invalidateAllUserSessions,
  signOut,
} from "@/lib/services/auth-service";
import { toast } from "@/components/ui/use-toast";

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
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;
      const pathname = usePathname();

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

            <DropdownMenuItem
              onClick={async () => {
                const res = await signOut({
                  userId: user.id,
                  pathname: pathname,
                });
                if (res?.error) {
                  toast({
                    title: res.error,
                    variant: "destructive",
                  });
                } else if (res?.success) {
                  toast({
                    title: res.success,
                  });
                }
              }}
            >
              Sign out user
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={async () => {
                const res = await invalidateAllUserSessions(user.id);
                if (res?.error) {
                  toast({
                    title: res.error,
                    variant: "destructive",
                  });
                } else if (res?.success) {
                  toast({
                    title: res.success,
                  });
                }
              }}
            >
              Clear sessions
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
