import Link from "next/link";

interface NavItemProps {
  label: string;
  href: string;
  target?: string;
}

export const NavItem = ({ label, href, target }: NavItemProps) => {
  return (
    <li>
      <Link href={href} target={target} className="hover:text-text/80">
        {label}
      </Link>
    </li>
  );
};
