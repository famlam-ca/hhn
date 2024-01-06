import Link from "next/link";
import { getServerSession } from "next-auth";
import { ArrowUpRight, LogIn } from "lucide-react";

import { authOptions } from "@/lib/auth/auth-options";
import MaxWidtHWrapper from "@/components/max-width-wrapper";
import { Icons } from "@/components/icons";
import { SignIn } from "@/components/auth-button";
import { buttonVariants } from "@/components/ui/button";
import { UserNav } from "@/components/navigation/user-nav";
import MobileNav from "@/components/navigation/mobile-nav";

const style =
  "relative tracking-wide after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition after:content-[''] hover:after:origin-bottom-left hover:after:scale-100";

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-border bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidtHWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="z-40">
            <Icons.logo className="h-8 w-8 fill-text" />
          </Link>

          <MobileNav isAuth={!!user} />

          <div className="hidden items-center space-x-4 text-xs font-semibold sm:flex">
            <Link href="/dashboard" className={`${style}`}>
              Dashboard
            </Link>

            <Link href="/games" className={`${style}`}>
              Game Hub
            </Link>

            <Link
              href="https://panel.famlam.ca/"
              target="_blank"
              className="flex items-center -space-x-2"
            >
              <span className={`${style}`}>Server Manager</span>
              <ArrowUpRight className="relative -right-2 -top-1 h-3 w-3" />
            </Link>

            <Link href="/about" className={`${style}`}>
              About
            </Link>

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
                  name={!user.name ? "" : user.name}
                  full_name={
                    !user.first_name && user.last_name
                      ? ""
                      : `${user.first_name} ${user.last_name}`
                  }
                  email={user.email ?? ""}
                  imageUrl={user.image ?? ""}
                  role={user.role ?? ""}
                />
              </>
            )}
          </div>
        </div>
      </MaxWidtHWrapper>
    </nav>
  );
};

export default Navbar;
