import React from "react";
import Link from "next/link";
import { LucideProps } from "lucide-react";

import { cn } from "@/lib/utils";

interface IconProps {
  icon: React.ElementType<LucideProps>;
  label: string;
  active: boolean;
  href: string;
  className?: string;
}

const SidebarItem = ({
  icon: Icon,
  label,
  active,
  href,
  className,
  ...props
}: IconProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "relative ml-12 flex h-14 items-center gap-4 whitespace-nowrap text-left font-medium text-muted transition-all duration-200 ease-in-out hover:ml-12 hover:text-primary md:ml-8",
        className,
        active && "text-primary",
      )}
    >
      <Icon {...props} size={24} />
      <p className="hidden truncate lg:block">{label}</p>
    </Link>
  );
};

export default SidebarItem;
