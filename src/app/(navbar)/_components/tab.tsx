import { ArrowRight, LucideIcon } from "lucide-react"
import Link from "next/link"

interface TabProps {
  icon: LucideIcon
  title: string
  description: string
  href: string
  hrefLabel: string
}

export const Tab = ({
  icon: Icon,
  title,
  description,
  href,
  hrefLabel,
}: TabProps) => {
  return (
    <div className="md:flex-1">
      <div className="flex flex-col space-y-2 border-l-4 border-border py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
        <div className="flex items-center">
          <div className="mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-background">
            <Icon className="h-6 w-6" />
          </div>
          <span className="text-xl font-semibold">{title}</span>
        </div>
        <span className="mt-2 text-muted">{description}</span>
        <Link
          href={href}
          className="group/hover flex items-center font-semibold text-primary">
          {hrefLabel}
          <ArrowRight className="ml-1 h-5 w-5 transition-all group-hover/hover:ml-2" />
        </Link>
      </div>
    </div>
  )
}
