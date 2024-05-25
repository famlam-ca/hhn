"use client"

import { LogIn } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { Icons } from "@/components/icons"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { MobileNav } from "@/components/mobile-nav"
import { buttonVariants } from "@/components/ui/button"
import { UserMenu } from "@/components/user-menu"
import { useSession } from "@/providers/session-provider"

import { NavItem } from "./nav-item"

const Navbar = () => {
  const { user } = useSession()
  const pathname = usePathname()

  const routes = [
    {
      label: "Dashboard",
      href: "/dashboard",
    },
    {
      label: "Game Hub",
      href: "/games",
    },
    {
      label: "Game Servers",
      href: "https://panel.famlam.ca/",
      target: "_blank",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Docs",
      href: "https://docs.famlam.ca",
      target: "_blank",
    },
  ]

  return (
    <nav className="sticky inset-x-0 top-0 z-30 h-14 w-full border-b border-border bg-background/75 backdrop-blur-lg transition-all">
      <MaxWidthWrapper>
        <div className="flex h-14 items-center justify-between">
          <Link href="/" className="z-40 flex items-center gap-2">
            <Icons.logo className="h-8 w-8 fill-text" />
            <h2 className="text-xl font-bold">
              H<span className="text-primary">HN</span>
            </h2>
          </Link>

          <div className="flex items-center gap-x-4">
            <MobileNav isAuth={!!user} />

            <ul className="hidden items-center space-x-4 text-xs font-semibold sm:flex">
              {routes.map((route) => (
                <NavItem
                  key={route.href}
                  label={route.label}
                  href={route.href}
                  target={route.target}
                />
              ))}

              {!user && (
                <Link
                  href={`/auth/sign-in?callbackUrl=${pathname}`}
                  className={buttonVariants({
                    variant: "secondary",
                  })}>
                  Sign In
                  <LogIn className="ml-1 h-5 w-5" />
                </Link>
              )}
            </ul>
            {!!user && <UserMenu user={user} pathname={pathname!} />}
          </div>
        </div>
      </MaxWidthWrapper>
    </nav>
  )
}

export default Navbar
