import Link from "next/link";

interface NavItemProps {
  label: string;
  href: string;
  target?: string;
}

const style =
  "relative tracking-wide after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-primary after:transition after:content-[''] hover:after:origin-bottom-left hover:after:scale-100";

export const NavItem = ({ label, href, target }: NavItemProps) => {
  return (
    <li>
      <Link href={href} target={target} className={style}>
        {label}
      </Link>
    </li>
  );
};
