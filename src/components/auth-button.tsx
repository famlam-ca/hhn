"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { signIn, signOut } from "next-auth/react";

import { cn } from "@/lib/utils";

interface ButtonProps {
  className?: string;
  children?: ReactNode;
}

export const SignIn = ({ className, children }: ButtonProps) => {
  return (
    <button
      className={
        children
          ? cn("flex items-center gap-1", className)
          : cn("text-left", className)
      }
      onClick={() => signIn()}
    >
      {children ? children : <span className={cn("", className)}>Sign In</span>}
    </button>
  );
};

export const SignOut = ({ className, children }: ButtonProps) => {
  return (
    <button
      className={
        children
          ? cn("flex items-center gap-1", className)
          : cn("text-left", className)
      }
      onClick={() => signOut()}
    >
      {children ? (
        children
      ) : (
        <span className={cn("", className)}>Sign Out</span>
      )}
    </button>
  );
};
