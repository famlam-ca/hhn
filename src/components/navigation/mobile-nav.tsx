"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, LogIn, LogOut, Menu } from "lucide-react";

import { SignOut } from "../auth-button";
import { MobileNavItem } from "./mobile-nav-item";

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen();
    }
  };

  const routes = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Game Hub",
      href: "/games",
    },
    {
      label: "Server Manager",
      href: "https://panel.famlam.ca",
      target: "_blank",
      icon: ArrowUpRight,
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Docs",
      href: "/docs",
    },
  ];

  return (
    <div className="sm:hidden">
      <Menu onClick={toggleOpen} className="relative z-50 h-6 w-6" />

      {isOpen ? (
        <div className="fixed inset-0 z-10 w-full animate-in fade-in-20 slide-in-from-top-5">
          <ul className="absolute grid w-full gap-3 border-b border-border bg-background px-10 pb-8 pt-20 shadow-xl">
            {!isAuth && (
              <MobileNavItem
                label="Get Started"
                href="/auth/sign-up"
                icon={ArrowRight}
                className="flex w-full items-center font-semibold text-primary"
                IconClassName="ml-2 h-5 w-5"
              />
            )}

            {routes.map((route) => (
              <MobileNavItem
                key={route.href}
                label={route.label}
                href={route.href}
                icon={route.icon}
              />
            ))}

            {isAuth && (
              <MobileNavItem
                label={isAuth ? "Sign Out" : "Sign In"}
                href={isAuth ? "/auth/sign-out" : "/auth/sign-in"}
                icon={isAuth ? LogOut : LogIn}
                className="items-center gap-2"
                IconClassName="w-4 h-4"
              />
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
