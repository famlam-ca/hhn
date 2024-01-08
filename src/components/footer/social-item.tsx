import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { Hint } from "@/components/hint";

interface SocialItemProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

const style = "flex items-center";

export const SocialItem = ({ label, href, icon: Icon }: SocialItemProps) => {
  return (
    <li>
      <Link href={href} target="_blank" className={style}>
        <Hint label={label}>
          <Icon className="h-5 w-5" />
        </Hint>
      </Link>
    </li>
  );
};
