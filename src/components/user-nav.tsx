"use client";

import {
  CloudCog,
  LifeBuoy,
  LogOut,
  Newspaper,
  Phone,
  Settings,
  User,
  UserCircle,
  UserCog,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Icons } from "@/components/icons";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CustomUser } from "@/types";

export const UserNav = ({ user }: { user: CustomUser }) => {
  const full_name = `${user.first_name} ${user.last_name}`;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="overflow-visible">
        <Button
          variant="ghost"
          className="aspect-square h-8 w-8 rounded-full bg-transparent ring-2 ring-primary ring-offset-2"
        >
          <Avatar className="relative h-8 w-8">
            {user.image ? (
              <div className="relative aspect-square h-full w-full">
                <Image
                  src={user.image}
                  alt="profile picture"
                  fill
                  referrerPolicy="no-referrer"
                />
              </div>
            ) : (
              <AvatarFallback>
                <Icons.user className="h-4 w-4 text-text" />
              </AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-background" align="end">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-0.5 leading-none">
            <div className="flex justify-between">
              <p className="text-sm font-medium text-text">
                {user.display_name}
              </p>
              {full_name && (
                <p className="truncate text-xs font-medium text-muted">
                  {full_name}
                </p>
              )}
            </div>
            <p className="w-[200px] truncate text-xs text-muted">
              {user.email}
            </p>
            <p className="text-xs capitalize text-muted">{user.role}</p>
          </div>
        </div>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-muted">Account</p>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href={`/u/${user.username}/profile`}>
              <UserCircle className="mr-2 h-5 w-5" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/u/${user.username}/account`}>
              <User className="mr-2 h-5 w-5" />
              Account
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href={`/u/${user.username}/settings`}>
              <Settings className="mr-2 h-5 w-5" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-muted">Support</p>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href="/contact">
              <LifeBuoy className="mr-2 h-5 w-5" />
              Support
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/contact">
              <Phone className="mr-2 h-5 w-5" />
              Contact
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuLabel>
            <p className="text-muted">Documentation</p>
          </DropdownMenuLabel>

          <DropdownMenuItem asChild>
            <Link href="/docs">
              <Newspaper className="mr-2 h-5 w-5" />
              Docs
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem disabled={user.role !== "admin"} asChild>
            <Link href="/docs/api">
              <CloudCog className="mr-2 h-5 w-5" />
              API
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {user.role === "admin" && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuLabel>
                <p className="text-muted">Administration</p>
              </DropdownMenuLabel>

              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <UserCog className="mr-2 h-5 w-5" />
                  Admin
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </>
        )}

        <DropdownMenuItem asChild>
          <Link href="/auth/sign-out">
            <LogOut className="mr-1 h-5 w-5" />
            Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
