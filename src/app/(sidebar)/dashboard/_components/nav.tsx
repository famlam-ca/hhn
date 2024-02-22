import { Image, LayoutDashboard } from "lucide-react";
import { getServerSession } from "next-auth";
import Link from "next/link";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { UserNav } from "@/components/navigation/user-nav";
import { authOptions } from "@/lib/auth-options";
import { getUserByUsername } from "@/lib/user-service";
import { CustomUser, ServerType } from "@/types/types";

import { MobileNav } from "./mobile-nav";
import { NavItem } from "./nav-item";

export const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const user = (await getUserByUsername(session?.user.username!)) as CustomUser;

  const routes = [
    {
      label: "Bulk Actions",
      icon: Image,
      href: "/dashboard",
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

          <div className="hidden gap-4 sm:flex">
            <ul className="flex items-center space-x-4 font-semibold text-muted-foreground">
              {routes.map((route) => (
                <NavItem
                  key={route.href}
                  label={route.label}
                  icon={route.icon}
                  href={route.href}
                />
              ))}
            </ul>

            <UserNav user={user} />
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  );
};
