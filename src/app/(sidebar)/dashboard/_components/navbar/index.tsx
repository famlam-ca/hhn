import { Image, LayoutDashboard } from "lucide-react";
import Link from "next/link";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { UserNav } from "@/components/user-nav";
import { validateSession } from "@/lib/lucia";

import { MobileNav } from "./mobile-nav";
import { NavItem } from "./nav-item";

export const Navbar = async () => {
  const { user } = await validateSession();

  const routes = [
    {
      label: "Bulk Actions",
      icon: Image,
      href: "/dashboard",
      isNotAdmin: user?.role !== "admin",
    },
  ];

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-12 w-full border-b border-accent bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper className="max-w-full">
        <div className="flex h-12 items-center justify-between">
          <Link href="/dashboard" className="z-40 flex items-center">
            <h2 className="flex items-center text-xl font-semibold text-muted-foreground hover:text-text">
              <LayoutDashboard className="h6 mr-2 w-6" />
              Dashboard
            </h2>
          </Link>

          <MobileNav />

          {user && (
            <div className="hidden gap-4 sm:flex">
              <ul className="flex items-center space-x-4 font-semibold text-muted-foreground">
                {routes.map((route) => (
                  <NavItem
                    key={route.href}
                    label={route.label}
                    icon={route.icon}
                    href={route.href}
                    isNotAdmin={route.isNotAdmin}
                  />
                ))}
              </ul>
              <UserNav user={user} pathname="/dashboard" />
            </div>
          )}
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
