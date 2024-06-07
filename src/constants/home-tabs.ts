import { GraduationCap, PencilRuler, Server } from "lucide-react"

export const TABS = [
  {
    icon: Server,
    title: "Homelab",
    description: "A humble homelab environment for friends and family.",
    href: "/dashboard",
    hrefLabel: "Explore",
  },
  {
    icon: GraduationCap,
    title: "Learning",
    description: "One SysAdmin, with one dream. Learning in the process.",
    href: "/about",
    hrefLabel: "Learn More",
  },
  {
    icon: PencilRuler,
    title: "Projects",
    description:
      "Find my current and past projects - see what I've been up to.",
    href: "/about/projects",
    hrefLabel: "Projects",
  },
]
