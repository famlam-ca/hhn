"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

import { Button, buttonVariants } from "@/components/ui/button"
import { PROJECTS } from "@/constants/projects"

export const ProjectsContent = () => {
  return (
    <>
      <div className="flex min-w-full justify-start pb-8">
        <Link href="/about/me">
          <Button variant="outline" asChild>
            <span>
              <ArrowLeft className="mr-0.5 h-5 w-5" />
              <p className="mr-1 hidden md:block">Back to:</p>
              About me
            </span>
          </Button>
        </Link>
      </div>

      <section>
        {PROJECTS.map((project, index) => (
          <Fragment key={project.label}>
            <div className="flex items-center justify-between">
              <h2 className="font-bold capitalize text-muted-foreground">
                {project.label}
              </h2>

              {project.href && (
                <Link
                  href={project.href}
                  target="_blank"
                  className={buttonVariants({
                    variant: "outline",
                    size: "sm",
                  })}>
                  Details
                </Link>
              )}
            </div>

            <div className="my-8 h-px self-center rounded bg-border" />

            <div
              className={`mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2 ${index % 2 !== 0 ? "lg:flex lg:flex-row-reverse lg:justify-between" : "lg:flex"}`}>
              <img
                src={project.image}
                alt={project.label}
                className="h-52 w-full max-w-sm object-cover"
              />

              <p className="prose max-w-full text-text lg:prose-lg">
                {project.description}
              </p>
            </div>
          </Fragment>
        ))}
      </section>

      <div className="flex min-w-full justify-start pt-8">
        <Link href="/about/me">
          <Button variant="outline" asChild>
            <span>
              <ArrowLeft className="mr-0.5 h-5 w-5" />
              <p className="mr-1 hidden md:block">Back to:</p>
              About me
            </span>
          </Button>
        </Link>
      </div>
    </>
  )
}
