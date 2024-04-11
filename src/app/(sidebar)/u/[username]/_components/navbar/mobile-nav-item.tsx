"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

interface MobileNavItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
  isLast?: boolean;
}

export const MobileNavItem = ({
  label,
  href,
  icon: Icon,
  isLast,
}: MobileNavItemProps) => {
  return (
    <>
      <li>
        <Button variant="ghost" asChild>
          <Link href={href} className="w-full">
            <span className="flex w-full">
              <Icon className="mr-2 h-5 w-5" />
              {label}
            </span>
          </Link>
        </Button>
      </li>
      {!isLast && <div className="h-px w-full bg-accent" />}
    </>
  );
};
