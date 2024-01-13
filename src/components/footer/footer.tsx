import Link from "next/link";
import { Github, Globe } from "lucide-react";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";

import { NavItem } from "./nav-item";
import { SocialItem } from "./social-item";

const Footer = () => {
  const routes = [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Projects",
      href: "/projects",
    },
    {
      label: "Docs",
      href: "/docs",
    },
    {
      label: "Contact",
      href: "/contact",
    },
    {
      label: "Terms",
      href: "/terms",
    },
  ];

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/SlickYeet/famlam",
      icon: Github,
    },
    {
      label: "Website",
      href: "https://www.famlam.ca",
      icon: Globe,
    },
  ];

  return (
    <footer className="relative bottom-0 w-full border-t-2 border-border bg-background/80">
      <MaxWidthWrapper className="h-20 sm:flex sm:items-center sm:justify-between">
        <div className="flex items-center text-sm sm:text-center">
          <span>@ 2023&nbsp;</span>
          <Link
            href="/"
            className="text-primary underline-offset-2 hover:underline"
          >
            HHN
          </Link>
          <span>™. All rights reserved.</span>
        </div>

        <div className="flex items-center sm:space-x-4">
          <ul className="mt-3 flex flex-wrap space-x-2 text-sm sm:mt-0">
            {routes.map((route) => (
              <NavItem key={route.href} label={route.label} href={route.href} />
            ))}
          </ul>

          <p>|</p>

          <ul className="mt-3 flex flex-wrap space-x-2 text-sm sm:mt-0">
            {socials.map((social) => (
              <SocialItem
                key={social.href}
                icon={social.icon}
                href={social.href}
                label={social.label}
              />
            ))}
          </ul>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;
