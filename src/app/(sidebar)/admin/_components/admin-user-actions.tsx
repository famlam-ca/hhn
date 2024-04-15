"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
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
import {
  invalidateAllUserSessions,
  signOut,
} from "@/lib/services/auth-service";
import { useSession } from "@/providers/session-provider";

import { Users } from "./columns";

export const AdminUserActions = ({ row }: { row: Row<Users> }) => {
  const { user } = useSession();
  const dbUser = row.original;
  const self = user && user.id === dbUser.id;

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
          onClick={() => navigator.clipboard.writeText(dbUser.id)}
        >
          Copy user ID
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href={`/admin/${dbUser.username}/edit`}>Edit user</Link>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          disabled={!!self}
          onClick={async () => {
            const res = await signOut({ userId: dbUser.id });
            toast({
              title: res.message,
              variant: res.success ? "default" : "destructive",
            });
          }}
        >
          Sign out user
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={async () => {
            const res = await invalidateAllUserSessions({
              userId: dbUser.id,
            });
            toast({
              title: res.message,
              variant: res.success ? "default" : "destructive",
            });
          }}
        >
          Clear sessions
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href={`/${dbUser.username}`}>View profile</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
