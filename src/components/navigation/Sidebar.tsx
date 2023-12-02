"use client";

import { PropsWithChildren, useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import {
  Gamepad2,
  Home,
  LayoutDashboard,
  LogIn,
  LogOut,
  Mail,
  Server,
  Settings,
  User,
} from "lucide-react";

import Box from "../Box";
import { Icons } from "../Icons";
import SidebarItem from "./SidebarItem";
import { SignIn, SignOut } from "../auth/Button";
import MobileNav from "./MobileNav";

const Sidebar = () => {
  const { data: session } = useSession();
  const user = session?.user;

  const pathname = usePathname();

  const routes = useMemo(
    () => [
      {
        icon: Home,
        label: "Home",
        active: pathname === "/",
        href: "/",
      },
      {
        icon: LayoutDashboard,
        label: "Dashboard",
        active: pathname === "/dashboard",
        href: "/dashboard",
      },
      {
        icon: Gamepad2,
        label: "Game Hub",
        active: pathname === "/games",
        href: "/games",
      },
      {
        icon: Server,
        label: "Server Manager",
        active: pathname === "/servers",
        href: "https://panel.famlam.ca",
      },
      {
        icon: User,
        label: "Profile",
        active: pathname === "/account/profile",
        href: "/account/profile",
      },
      {
        icon: Mail,
        label: "Email",
        active: pathname === "/account/mail",
        href: "/account/mail",
      },
      {
        icon: Settings,
        label: "Settings",
        active: pathname === "/account/settings",
        href: "/account/settings",
      },
    ],
    [pathname],
  );

  return (
    <div className="flex sm:ml-24 lg:ml-72">
      <MobileNav isAuth={!!user} />

      <div className="fixed left-0 top-0 hidden w-24 flex-shrink-0 flex-col gap-2 sm:flex lg:w-52">
        <Box>
          <div className="flex min-h-screen flex-col bg-background text-muted">
            <div className="m-8 flex items-center justify-center text-center text-text">
              <Link href="/">
                <Icons.logo className="h-8 w-8 fill-text" />
              </Link>
            </div>
            {routes.map((item) => (
              <SidebarItem key={item.label} {...item} />
            ))}

            <div className="my-8 h-1 w-4/5 self-center rounded bg-primary" />

            <div className="relative ml-12 flex h-14 items-center gap-4 whitespace-nowrap text-left font-medium text-muted transition-all duration-200 ease-in-out hover:ml-12 hover:text-primary sm:ml-8">
              {!user ? (
                <>
                  <SignIn>
                    <LogIn className="mr-3 h-6 w-6" />
                    <span className="hidden lg:block">Sign In</span>
                  </SignIn>
                </>
              ) : (
                <>
                  <SignOut>
                    <LogOut className="mr-3 h-6 w-6" />
                    <span className="hidden lg:block">Sign Out</span>
                  </SignOut>
                </>
              )}
            </div>
          </div>
        </Box>
      </div>
    </div>
  );
};

export default Sidebar;
