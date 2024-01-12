"use client";

import Link from "next/link";
import { CloudCog } from "lucide-react";

import MaxWidthWrapper from "@/components/max-width-wrapper";

import { NavItem } from "./nav-item";
import { MobileNav } from "./mobile-nav";

export const Navbar = () => {
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

          <MobileNav />

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
      </MaxWidthWrapper>
    </nav>
  );
};
