"use client";

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
import { usePathname } from "next/navigation";

import { getFakeUser } from "@/lib/services/user-service";
import { useSession } from "@/providers/session-provider";

import { useEffect, useState } from "react";
import { NavItem, NavItemSkeleton } from "./nav-item";
import { FakeUser } from "@/types";

export const Navigation = () => {
  const { user, session } = useSession();
  const pathname = usePathname();

  const [fakeUser, setFakeUser] = useState(null as FakeUser | null);

  if (!user) {
    useEffect(() => {
      const fetchFakeUser = async () => {
        const fakeUser = await getFakeUser();
        setFakeUser(fakeUser);
      };

      fetchFakeUser();
    }, []);
  }

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
      isFakeUser: !user,
    },
    {
      label: "Admin",
      href: "/admin",
      icon: UserCog,
      isNotAdmin: user?.role !== "admin",
    },
  ];

  return (
    <>
      {!session && !fakeUser ? (
        <ul className="space-y-2">
          {[...Array(8)].map((_, i) => (
            <NavItemSkeleton key={i} />
          ))}
        </ul>
      ) : (
        <>
          <ul className="space-y-2 px-2 pt-4 lg:pt-0">
            {routes.map((route) => (
              <NavItem
                key={route.href}
                label={route.label}
                icon={route.icon}
                href={route.href}
                target={route.target}
                isNotAdmin={route.isNotAdmin}
                isFakeUser={route.isFakeUser}
                isActive={
                  route.href === "/"
                    ? pathname === route.href
                    : pathname.startsWith(route.href)
                }
              />
            ))}
          </ul>
          <div className="my-8 h-1 w-4/5 self-center rounded bg-primary" />

          <ul className="px-2">
            <NavItem
              label={session ? "Sign Out" : "Sign In"}
              icon={session ? LogOut : LogIn}
              href={
                session
                  ? `/auth/sign-out?callbackUrl=${pathname}`
                  : "/auth/sign-in"
              }
            />
          </ul>
        </>
      )}
    </>
  );
};
