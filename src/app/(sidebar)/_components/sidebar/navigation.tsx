"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  Gamepad2,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  Server,
  User,
} from "lucide-react";

import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const pathname = usePathname();

  const routes = [
    {
      label: "Home",
      href: "/",
      icon: Home,
    },
    {
      label: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      label: "Game Hub",
      href: "/games",
      icon: Gamepad2,
    },
    {
      label: "Server Manager",
      href: "https://panel.famlam.ca",
      target: "_blank",
      icon: Server,
    },
    {
      label: "Account",
      href: `/account/${user?.username}`,
      icon: User,
    },
    {
      label: "Email",
      href: `/account/${user?.username}/mail`,
      icon: Mail,
    },
  ];

  if (!user?.username) {
    return (
      <ul className="space-y-2">
        {[...Array(7)].map((_, i) => (
          <NavItemSkeleton key={i} />
        ))}
      </ul>
    );
  }

  return (
    <>
      <ul className="space-y-2 px-2 pt-4 lg:pt-0">
        {routes.map((route) => (
          <NavItem
            key={route.href}
            label={route.label}
            icon={route.icon}
            href={route.href}
            target={route.target}
            isActive={pathname === route.href}
          />
        ))}
      </ul>

      <div className="my-8 h-1 w-4/5 self-center rounded bg-primary" />

      <ul className="px-2">
        <NavItem
          label={user ? "Sign Out" : "Sign In"}
          icon={user ? LogOut : LogIn}
          href={user ? "/auth/sign-out" : "/auth/sign-in"}
        />
      </ul>
    </>
  );
};
