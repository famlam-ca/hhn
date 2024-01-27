"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Menu, Users } from "lucide-react";

import { CustomUser } from "@/types/types";

import { MobileNavItem } from "./mobile-nav-item";

interface MobileNavProps {
  user: CustomUser;
}

export const MobileNav = ({ user }: MobileNavProps) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const routes = [
    {
      label: "Edit current users",
      icon: Users,
      href: `/u/${user.username}/profile`,
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
              />
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};
