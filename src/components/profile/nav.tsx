"use client";

import Link from "next/link";
import { User as PrismaUser } from "@prisma/client";
import { Mail, Settings, User, UserCircle } from "lucide-react";

import MaxWidthWrapper from "@/components/max-width-wrapper";

import { NavItem } from "./nav-item";

interface NavbarProps {
  user: PrismaUser;
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
    <nav className="border-b border-accent">
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

          <ul className="flex items-center space-x-4 font-semibold text-muted-foreground">
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
