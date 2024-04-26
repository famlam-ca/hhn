"use client";

import { CloudCog } from "lucide-react";
import Link from "next/link";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { UserMenu } from "@/components/user-menu";
import { useSession } from "@/providers/session-provider";

import { MobileNav } from "./mobile-nav";
import { NavItem } from "./nav-item";

export const Navbar = () => {
  const { user } = useSession();

  const routes = [
    {
      label: "API",
      icon: CloudCog,
      href: "/docs/api",
    },
  ];

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-12 w-full border-b border-accent bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-12 items-center justify-between">
          <Link href="/docs" className="z-40 flex items-center gap-2">
            <h2 className="text-xl font-semibold text-muted-foreground hover:text-text">
              Documentation
            </h2>
          </Link>

          <div className="flex items-center gap-x-4">
            <MobileNav />

            <div className="hidden gap-4 sm:flex">
              <ul className="hidden items-center space-x-4 font-semibold text-muted-foreground lg:flex">
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
            {!!user && <UserMenu user={user} pathname="/docs" />}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
