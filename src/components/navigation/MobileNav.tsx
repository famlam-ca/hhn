"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowRight, ArrowUpRight, LogIn, Menu } from "lucide-react";

import { SignIn, SignOut } from "../auth/Button";

const MobileNav = ({ isAuth }: { isAuth: boolean }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const toggleOpen = () => setOpen((prev) => !prev);

  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) toggleOpen();
  }, [pathname]);

  const closeOnCurrent = (href: string) => {
    if (pathname === href) {
      toggleOpen();
    }
  };

  return (
    <div className="sm:hidden">
      <Menu onClick={toggleOpen} className="relative z-50 h-6 w-6" />

      {isOpen ? (
        <div className="fixed inset-0 z-10 w-full animate-in fade-in-20 slide-in-from-top-5">
          <ul className="absolute grid w-full gap-3 border-b border-border bg-background px-10 pb-8 pt-20 shadow-xl">
            {!isAuth && (
              <>
                <li>
                  <Link
                    href="/auth/sign-up"
                    className="flex w-full items-center font-semibold text-primary"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </li>
                <li className="my-3 h-px w-full bg-input" />
              </>
            )}

            <li>
              <Link
                href="/"
                onClick={() => closeOnCurrent("/")}
                className="flex w-full items-center font-semibold"
              >
                Home
              </Link>
            </li>
            <li className="my-3 h-px w-full bg-input" />
            <li>
              <Link
                href="/dashboard"
                onClick={() => closeOnCurrent("/dashboard")}
                className="flex w-full items-center font-semibold"
              >
                Dashboard
              </Link>
            </li>
            <li className="my-3 h-px w-full bg-input" />
            <li>
              <Link
                href="/games"
                onClick={() => closeOnCurrent("/games")}
                className="flex w-full items-center font-semibold"
              >
                Game Hub
              </Link>
            </li>
            <li className="my-3 h-px w-full bg-input" />
            <li>
              <Link
                href="https://panel.famlam.ca"
                className="flex w-full items-center font-semibold"
              >
                Server Manager
                <ArrowUpRight className="relative -top-1 h-3 w-3" />
              </Link>
            </li>
            <li className="my-3 h-px w-full bg-input" />
            <li>
              <Link
                href="/about"
                onClick={() => closeOnCurrent("/about")}
                className="flex w-full items-center font-semibold"
              >
                About
              </Link>
            </li>

            {isAuth && (
              <>
                <li className="my-3 h-px w-full bg-input" />
                <li>
                  <SignOut className="flex w-full items-center font-semibold" />
                </li>
              </>
            )}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default MobileNav;
