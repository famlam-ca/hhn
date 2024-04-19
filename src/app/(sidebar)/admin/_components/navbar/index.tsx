"use client";

import { LifeBuoy, UserCog, Users } from "lucide-react";
import Link from "next/link";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { UserNav } from "@/components/user-nav";
import { useSession } from "@/providers/session-provider";

import { MobileNav } from "./mobile-nav";
import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navbar = ({ username }: { username: string }) => {
  const { user } = useSession();

  const routes = [
    {
      label: "Support Tickets",
      icon: LifeBuoy,
      href: "/admin/support",
    },
    {
      label: "Edit current user",
      icon: Users,
      href: `/u/${username}/profile`,
    },
  ];

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-12 w-full border-b border-accent bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper className="max-w-full">
        <div className="flex h-12 items-center justify-between">
          <Link href={`/admin`} className="z-40 flex items-center">
            <h2 className="flex items-center text-xl font-semibold text-muted-foreground hover:text-text">
              <UserCog className="mr-2 h-6 w-6" />
              Admin
            </h2>
          </Link>

          <div className="flex items-center gap-x-4">
            <MobileNav username={username} />

            <div className="hidden gap-4 sm:flex">
              <ul className="hidden items-center space-x-4 font-semibold text-muted-foreground sm:flex">
                {routes.map((route) => (
                  <NavItem
                    key={route.href}
                    label={route.label}
                    icon={route.icon}
                    href={route.href}
                  />
                ))}
              </ul>
            </div>
            {!!user && <UserNav user={user} pathname="/dashboard" />}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};

export const NavbarSkeleton = () => {
  return (
    <MaxWidthWrapper>
      <div className="flex justify-between">
        <Skeleton className="h-12" />
        <ul className="flex items-center">
          {[...Array(7)].map((_, i) => (
            <NavItemSkeleton key={i} />
          ))}
        </ul>
      </div>
    </MaxWidthWrapper>
  );
};
