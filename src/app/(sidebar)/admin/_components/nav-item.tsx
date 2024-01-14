"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ProfileNavItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
}

export const NavItem = ({ label, icon: Icon, href }: ProfileNavItemProps) => {
  return (
    <li>
      <Link href={href} className="flex items-center hover:text-text">
        <Icon className="mr-2 h-5 w-5" />
        {label}
      </Link>
    </li>
  );
};

export const NavItemSkeleton = () => {
  return (
    <div className="space-y-2">
      <div className="flex">
        <Skeleton className="mr-2 h-5 w-5 rounded-full" />
        <Skeleton className="h-5 w-12" />
      </div>
    </div>
  );
};
