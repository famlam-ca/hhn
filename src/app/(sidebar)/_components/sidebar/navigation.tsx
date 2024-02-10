"use client";

import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import {
  File,
  Gamepad2,
  Home,
  Info,
  LayoutDashboard,
  LogIn,
  LogOut,
  Server,
  User,
  UserCog,
} from "lucide-react";

import { NavItem, NavItemSkeleton } from "./nav-item";

export const Navigation = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const pathname = usePathname();
  const callbackUrl = `?callbackUrl=${encodeURIComponent(pathname)}` ?? "/";

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
      label: "Game Servers",
      href: "https://panel.famlam.ca",
      target: "_blank",
      icon: Server,
    },
    {
      label: "About",
      href: "/about",
      icon: Info,
    },
    {
      label: "Docs",
      href: "/docs",
      icon: File,
    },
    {
      label: "Profile",
      href: `/u/${user?.username}`,
      icon: User,
    },
    {
      label: "Admin",
      href: "/admin",
      icon: UserCog,
      isNotAdmin: user?.role !== "admin",
    },
  ];

  if (!user) {
    return (
      <ul className="space-y-2">
        {[...Array(8)].map((_, i) => (
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
            isActive={
              route.href === "/"
                ? pathname === route.href
                : pathname.startsWith(route.href)
            }
            isNotAdmin={route.isNotAdmin}
          />
        ))}
      </ul>

      <div className="my-8 h-1 w-4/5 self-center rounded bg-primary" />

      <ul className="px-2">
        <NavItem
          label={user ? "Sign Out" : "Sign In"}
          icon={user ? LogOut : LogIn}
          href={
            user
              ? `/auth/sign-out${callbackUrl}`
              : `/auth/sign-in${callbackUrl}`
          }
        />
      </ul>
    </>
  );
};
