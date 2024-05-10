"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Fragment } from "react"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Button, buttonVariants } from "@/components/ui/button"
import { Wrapper } from "@/components/wrapper"
import { PROJECTS } from "@/constants/projects"

export const ProjectsContent = () => {
  return (
    <>
      <div className="mt-8 h-48 bg-aboutBanner">
        <div className="flex h-full flex-col items-center justify-center text-center font-bold tracking-widest backdrop-blur-sm">
          <h1 className="text-6xl text-white sm:text-8xl">About</h1>
          <h2>
            PRO<span className="text-primary">JECTS</span>
          </h2>
        </div>
      </div>

      <MaxWidthWrapper className="my-8">
        <Wrapper className="space-y-6">
          <div className="flex min-w-full justify-start pb-8">
            <Link href="/about/me">
              <Button variant="outline" asChild>
                <span>
                  <ArrowLeft className="ml-0.5 h-5 w-5" />
                  <p className="mr-1">Back to:</p>
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

                  <p className="prose lg:prose-lg max-w-full text-text">
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
                  <ArrowLeft className="ml-0.5 h-5 w-5" />
                  <p className="mr-1">Back to:</p>
                  About me
                </span>
              </Button>
            </Link>
          </div>
        </Wrapper>
      </MaxWidthWrapper>
    </>
  )
}
