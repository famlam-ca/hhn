import Link from "next/link";
import { getServerSession } from "next-auth";
import { ArrowUpRight, LogIn } from "lucide-react";

import { authOptions } from "@/lib/auth-options";
import MaxWidtHWrapper from "@/components/max-width-wrapper";
import { Icons } from "@/components/icons";
import { SignIn } from "@/components/auth-button";
import { buttonVariants } from "@/components/ui/button";
import { UserNav } from "@/components/navigation/user-nav";
import MobileNav from "@/components/navigation/mobile-nav";
import { NavItem } from "./nav-item";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const routes = [
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
      href: "https://panel.famlam.ca/",
      target: "_blank",
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
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-border bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidtHWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="z-40 flex items-center gap-2">
            <Icons.logo className="h-8 w-8 fill-text" />
            <h2 className="text-xl font-bold">
              H<span className="text-primary">HN</span>
            </h2>
          </Link>

          <MobileNav isAuth={!!user} />

          <ul className="hidden items-center space-x-4 text-xs font-semibold sm:flex">
            {routes.map((route) => (
              <NavItem
                key={route.href}
                label={route.label}
                href={route.href}
                target={route.target}
              />
            ))}

            {!user ? (
              <SignIn
                className={buttonVariants({
                  variant: "secondary",
                })}
              >
                Sign In
                <LogIn className="h-5 w-5" />
              </SignIn>
            ) : (
              <>
                <UserNav
                  name={!user.username ? "Username" : user.username}
                  full_name={
                    !user.first_name && !user.last_name
                      ? "Full name"
                      : `${user.first_name} ${user.last_name}`
                  }
                  email={user.email ?? ""}
                  imageUrl={user.image ?? ""}
                  role={user.role ?? ""}
                />
              </>
            )}
          </ul>
        </div>
      </MaxWidtHWrapper>
    </nav>
  );
};

export default Navbar;
