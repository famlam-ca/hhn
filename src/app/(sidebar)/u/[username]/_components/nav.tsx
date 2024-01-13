"use client";

import Link from "next/link";
import { Mail, Settings, User, UserCircle } from "lucide-react";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Skeleton } from "@/components/ui/skeleton";
import { CustomUser } from "@/types/types";

import { NavItem, NavItemSkeleton } from "./nav-item";
import { MobileNav } from "./mobile-nav";

interface NavbarProps {
  user: CustomUser;
}

export const Navbar = ({ user }: NavbarProps) => {
  const routes = [
    {
      label: "Profile",
      icon: UserCircle,
      href: `/u/${user.username}/profile`,
    },
    {
      label: "Account",
      icon: User,
      href: `/u/${user.username}/account`,
    },
    {
      label: "Mail",
      icon: Mail,
      href: `/u/${user.username}/mail`,
    },
    {
      label: "Settings",
      icon: Settings,
      href: `/u/${user.username}/settings`,
    },
  ];

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-12 w-full border-b border-accent bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-12 items-center justify-between">
          <Link
            href={`/u/${user.username}`}
            className="z-40 flex items-center gap-2"
          >
            <h2 className="text-xl font-semibold text-muted-foreground hover:text-text">
              {user.username}
            </h2>
          </Link>

          <MobileNav user={user!} />

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
