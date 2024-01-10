import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileNavItemProps {
  label: string;
  href: string;
  target?: string;
  icon?: LucideIcon;
  className?: string;
  IconClassName?: string;
}

const style = "w-full";

export const MobileNavItem = ({
  label,
  href,
  target,
  icon: Icon,
  className,
  IconClassName,
}: MobileNavItemProps) => {
  return (
    <li>
      <Button variant="ghost" asChild>
        <Link href={href} target={target} className={style}>
          <span className={cn("flex w-full text-left", className)}>
            {label}
            {Icon && <Icon className={cn("h-3 w-3", IconClassName)} />}
          </span>
        </Link>
      </Button>
    </li>
  );
};
