"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

interface ProfileNavItemProps {
  label: string;
  icon: LucideIcon;
  href: string;
}

export const NavItem = ({ label, icon: Icon, href }: ProfileNavItemProps) => {
  return (
    <li className="flex items-center hover:text-text">
      <Icon className="mr-2 h-5 w-5" />
      <Link href={href}>{label}</Link>
    </li>
  );
};
