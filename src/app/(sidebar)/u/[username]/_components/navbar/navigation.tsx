"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import { Cog, User } from "lucide-react";

import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const pathname = usePathname();

  const routes = [
    {
      label: "Profile",
      href: `/u/${user?.username}`,
      icon: User,
    },
    {
      label: "Settings",
      href: `/u/${user?.username}/settings`,
      icon: Cog,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(4)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <ul className="space-y-2 px-2 pt-4 lg:pt-0">
      {routes.map((route) => (
        <NavItem
          key={route.href}
          label={route.label}
          icon={route.icon}
          href={route.href}
          isActive={pathname === route.href}
        />
      ))}
    </ul>
  );
};
