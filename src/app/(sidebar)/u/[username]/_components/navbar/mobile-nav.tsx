"use client";

import { Menu, Settings, User, UserCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { MobileNavItem } from "./mobile-nav-item";

interface MobileNavProps {
  username: string;
}

export const MobileNav = ({ username }: MobileNavProps) => {
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
      label: "Profile",
      href: `/u/${username}/profile`,
      icon: UserCircle,
    },
    {
      label: "Account",
      href: `/u/${username}/account`,
      icon: User,
    },
    {
      label: "Settings",
      href: `/u/${username}/settings`,
      icon: Settings,
      isLast: true,
    },
  ];

  return (
    <div className="sm:hidden">
      <Menu
        onClick={toggleOpen}
        className="relative z-50 h-6 w-6 text-muted-foreground"
      />

      {isOpen ? (
        <div className="fixed inset-0 z-10 w-full animate-in fade-in-20 slide-in-from-top-5">
          <ul className="absolute flex w-full flex-col gap-y-3 border-b border-border bg-background px-10 pb-8 pt-20 shadow-xl">
            {routes.map((route) => (
              <MobileNavItem
                key={route.href}
                label={route.label}
                href={route.href}
                icon={route.icon}
                isLast={route.isLast}
                onClick={() => closeOnCurrent(route.href)}
              />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
