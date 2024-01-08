"use client";

import Link from "next/link";
import { ArrowUpRight, LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useProfileSidebar } from "@/store/use-profile-sidebar";
import { Skeleton } from "@/components/ui/skeleton";

interface NavItemProps {
  icon: LucideIcon;
  label: string;
  href: string;
  target?: string;
  isActive?: boolean;
}

export const NavItem = ({
  icon: Icon,
  label,
  href,
  target,
  isActive,
}: NavItemProps) => {
  const { collapsed } = useProfileSidebar();

  return (
    <Button
      variant="ghost"
      className={cn(
        "h-12 w-full text-muted",
        collapsed ? "justify-center" : "justify-start",
        isActive && "bg-accent text-text",
      )}
      asChild
    >
      <Link href={href} target={target}>
        <div className="flex items-center gap-x-4">
          <Icon className={cn("h-5 w-5", collapsed ? "mr-0" : "mr-2")} />
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
