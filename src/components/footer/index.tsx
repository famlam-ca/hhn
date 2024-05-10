import Link from "next/link"
import { Github, Globe } from "lucide-react"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"

import { NavItem } from "./nav-item"
import { SocialItem } from "./social-item"

const Footer = () => {
  const year = new Date().getFullYear()

  const routes = [
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Projects",
      href: "/about/projects",
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
      label: "Support",
      href: "/contact/support",
    },
  ]

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
  ]

  return (
    <footer className="relative bottom-0 w-full border-t-2 border-border bg-background/80">
      <MaxWidthWrapper className="h-20 items-center justify-between text-sm sm:flex">
        <div className="flex items-center sm:text-center">
          <span>&copy; {year}&nbsp;</span>
          <Link
            target="_blank"
            href="https://github.com/famlam-ca/HHN/blob/master/LICENSE.md"
            className="text-primary underline-offset-2 hover:underline">
            HHN
          </Link>
          <span>, All rights reserved.</span>
        </div>

        <div className="mt-3 flex items-center space-x-4 sm:mt-0">
          <ul className="flex flex-wrap space-x-2">
            {routes.map((route) => (
              <NavItem key={route.href} label={route.label} href={route.href} />
            ))}
          </ul>

          <ul>|</ul>

          <ul className="flex flex-wrap space-x-2">
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
  )
}

export default Footer
