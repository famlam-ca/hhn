"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface ButtonProps {
  children: React.ReactNode;
  className: string;
}

export const SignIn = ({ children, className }: ButtonProps) => {
  const pathname = usePathname();
  const callbackUrl =
    pathname !== "/"
      ? `/auth/sign-in?callbackUrl=${pathname}`
      : "/auth/sign-in";

  return (
    <Link
      href={callbackUrl}
      className={
        children
          ? cn("flex items-center gap-1", className)
          : cn("text-left", className)
      }
    >
      {children ? children : <span className={cn("", className)}>Sign In</span>}
    </Link>
  );
};

export const SignOut = ({ children, className }: ButtonProps) => {
  const pathname = usePathname();
  const callbackUrl =
    pathname !== "/"
      ? `/auth/sign-in?callbackUrl=${pathname}`
      : "/auth/sign-in";

  return (
    <Link
      href={callbackUrl}
      className={
        children
          ? cn("flex items-center gap-1", className)
          : cn("text-left", className)
      }
    >
      {children ? (
        children
      ) : (
        <span className={cn("", className)}>Sign Out</span>
      )}
    </Link>
  );
};
