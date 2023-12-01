import Link from "next/link";
import Image from "next/image";
import { ArrowRight, GraduationCap, Server } from "lucide-react";

import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/Button";

export default function Home() {
  return (
    <>
      {/* top */}
      <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-border bg-foreground px-7 py-2 shadow-md backdrop-blur transition-all hover:border-border/80 hover:bg-foreground/50">
          <p className="text-sm font-semibold text-text">
            Welcome, Enjoy Your Stay!
          </p>
        </div>
        <h1 className="max-4-xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Humble <span className="text-primary">Home Network</span>
        </h1>
        <p className="mt-5 max-w-prose sm:text-lg">
          A home for friends and family.
        </p>
        <Link
          href="/about"
          className={buttonVariants({
            variant: "outline",
            size: "lg",
            className: "mt-5",
          })}
        >
          Learn More
          <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </MaxWidthWrapper>

      {/* image/deco */}
      <div>
        <div className="mx-auto max-w-6xl px-6 lg:px-8">
          <div className="mt-16 flow-root sm:mt-24">
            <div className="-m-2 rounded-xl bg-foreground/5 p-2 ring-1 ring-inset ring-ring/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <Image
                src="/landing-banner.png"
                alt="home banner"
                width={1917}
                height={931}
                quality={100}
                className="rounded-md bg-background/80 p-2 shadow-2xl ring-1 ring-ring/10 sm:p-8 md:p-20"
              />
            </div>
          </div>
        </div>
      </div>

      {/* bottom */}
      <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56">
        <div className="mb-12 px-6 lg:px-8">
          <div className="mx-auto max-w-2xl sm:text-center">
            <h2 className="mt-2 text-4xl font-bold sm:text-5xl">
              H<span className="text-primary">HN</span>
            </h2>
            {/* fake text-balance until added to tailwind */}
            <p className="text-balance mt-4 text-lg text-muted">
              Stay and explore for a while. Around here you can learn about my
              current and past projects.
            </p>
          </div>
        </div>

        {/* Cards */}
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          {/* Homelab */}
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-border py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <div className="flex items-center">
                <div className="mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-background">
                  <Server className="h-6 w-6" />
                </div>
                <span className="text-xl font-semibold">Homelab</span>
              </div>
              <span className="mt-2 text-muted">
                A humble homelab environment for friends and family.
              </span>
              <Link
                href="/dashboard"
                className="group/hover flex items-center font-semibold text-primary"
              >
                Explore
                <ArrowRight className="ml-1 h-5 w-5 transition-all group-hover/hover:ml-2" />
              </Link>
            </div>
          </li>
          {/* Learning */}
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-border py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <div className="flex items-center">
                <div className="mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-background">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span className="text-xl font-semibold">Learning</span>
              </div>
              <span className="mt-2 text-muted">
                One SysAdmin, with one dream. Learning in the process.
              </span>
              <Link
                href="/about"
                className="group/hover flex items-center font-semibold text-primary"
              >
                Learn More
                <ArrowRight className="ml-1 h-5 w-5 transition-all group-hover/hover:ml-2" />
              </Link>
            </div>
          </li>
          {/* Projects */}
          <li className="md:flex-1">
            <div className="flex flex-col space-y-2 border-l-4 border-border py-2 pl-4 md:border-l-0 md:border-t-2 md:pb-0 md:pl-0 md:pt-4">
              <div className="flex items-center">
                <div className="mr-2 flex h-12 w-12 items-center justify-center rounded-full bg-background">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <span className="text-xl font-semibold">Projects</span>
              </div>
              <span className="mt-2 text-muted">
                Find my current and past projects - see what I&apos;ve been up
                to.
              </span>
              <Link
                href="/projects"
                className="group/hover flex items-center font-semibold text-primary"
              >
                Projects
                <ArrowRight className="ml-1 h-5 w-5 transition-all group-hover/hover:ml-2" />
              </Link>
            </div>
          </li>
        </ol>

        <div>
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="mt-16 flow-root sm:mt-24">
              <div className="-m-2 rounded-xl bg-foreground/5 p-2 ring-1 ring-inset ring-ring/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                <Image
                  src="/project-list.png" // add picture of projects page
                  alt="project list"
                  width={938}
                  height={718}
                  quality={100}
                  className="rounded-md bg-background/80 p-2 shadow-2xl ring-1 ring-ring/10 sm:p-8 md:p-20"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
