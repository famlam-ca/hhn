"use client";

import { ArrowUpRight, LucideIcon } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useSidebar } from "@/hooks/use-sidebar";
import { cn } from "@/lib/utils";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  target?: string;
  isNotAdmin?: boolean;
  isFakeUser?: boolean;
  isActive?: boolean;
}

export const NavItem = ({
  icon: Icon,
  label,
  href,
  target,
  isNotAdmin,
  isFakeUser,
  isActive,
}: NavItemProps) => {
  const { collapsed } = useSidebar();

  return (
    <Button
      variant="ghost"
      className={cn(
        "h-12 w-full text-muted",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent text-text",
        (isNotAdmin || isFakeUser) && "hidden",
      )}
      asChild
    >
      <Link href={href} target={target}>
        <div className="flex items-center gap-x-4">
          <Icon
            className={cn(
              "h-5 w-5",
              collapsed ? "mr-0" : "mr-2",
              isActive && "fill-text",
            )}
          />
          {!collapsed && (
            <>
              <span>{label}</span>
              {target && (
                <ArrowUpRight className="relative -top-1 right-4 h-3 w-3" />
              )}
            </>
          )}
        </div>
      </Link>
    </Button>
  );
};

export const NavItemSkeleton = () => {
  return (
    <li className="flex items-center gap-x-4 px-3 py-2">
      <Skeleton className="min-h-[48px] min-w-[48px] rounded-md" />
      <div className="hidden flex-1 lg:block">
        <Skeleton className="h-6" />
      </div>
    </li>
  );
};
