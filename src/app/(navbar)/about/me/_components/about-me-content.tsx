"use client"

import { ArrowLeft, ArrowRight } from "lucide-react"
import Link from "next/link"

import { CertShowcase } from "@/components/cert-showcase"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CERTS } from "@/constants/certs"

export const AboutMeContent = () => {
  return (
    <>
      <div className="flex min-w-full justify-between pb-8">
        <Link href="/about">
          <Button variant="outline" asChild>
            <span>
              <ArrowLeft className="mr-0.5 h-5 w-5" />
              <p className="mr-1 hidden md:block">Back to:</p>
              About
            </span>
          </Button>
        </Link>
        <Link href="/about/projects">
          <Button variant="outline" asChild>
            <span>
              <p className="mr-1 hidden md:block">Next up:</p>
              Projects
              <ArrowRight className="ml-0.5 h-5 w-5" />
            </span>
          </Button>
        </Link>
      </div>

      <section className="flex flex-col items-center justify-center gap-6 max-sm:space-y-6 sm:flex-row">
        <div>
          <h2 className="font-bold text-muted-foreground">
            From Tech Enthusiast to IT Aspirant: Unveiling My Path
          </h2>

          <div className="my-8 h-px self-center rounded bg-border" />

          <article className="prose max-w-full text-text lg:prose-lg">
            <p>
              As a BCIT Computer Information Systems Administration{" "}
              <Button variant="link" size="none" asChild>
                <Link
                  href="https://www.bcit.ca/programs/computer-information-systems-administration-diploma-full-time-1930dipma/"
                  target="_blank">
                  (CISA)
                </Link>
              </Button>{" "}
              alumni, I am deeply immersed in the world of technology. My
              journey began with a fervent passion for all things IT and web
              development, a flame that continues to burn brightly as I navigate
              the complexities of this ever-evolving field.
            </p>
            <p>
              Driven by a relentless curiosity and a desire to master the
              intricacies of systems administration and integration, I am on a
              quest to carve out my place in the realm of IT. With a keen eye
              for detail and a knack for problem-solving, I approach every
              challenge as an opportunity for growth and learning. Whether
              it&apos;s delving into the intricacies of server management or
              diving headfirst into the world of web development, I am
              constantly seeking to expand my knowledge and refine my skills.
            </p>
            <p>
              Through dedication, perseverance, and a genuine love for what I
              do, I am charting a course towards my dream of becoming a systems
              administrator and integrator. With each step forward, I am not
              only shaping my own future but also contributing to the
              ever-expanding tapestry of innovation and progress in the world of
              technology.
            </p>
            <p>
              Thanks for dropping by! Whether you&apos;re here to explore my
              projects or interested in collaboration, I&apos;m all ears. Feel
              free to reach out to me{" "}
              <Button variant="link" size="none" asChild>
                <Link href="/contact">here</Link>
              </Button>
              , for inquiries or just to chat about anything tech-related, from
              web development to the latest trends in IT. Let&apos;s connect and
              embark on this journey together!
            </p>
          </article>

          <div className="my-8 h-px self-center rounded bg-border" />
        </div>

        <div className="flex flex-col items-center gap-y-4">
          <Avatar className="aspect-square h-40 w-40 outline outline-offset-8 outline-border sm:h-52 sm:w-52">
            <AvatarImage
              src="https://github.com/SlickYeet.png"
              alt="SlickYeet.png"
              className="object-cover"
            />
            <AvatarFallback>SlickYeet</AvatarFallback>
          </Avatar>
          <Button
            variant="outline"
            size="lg"
            className="cursor-default font-extrabold hover:bg-transparent">
            Hi, I&apos;m Lasse!
          </Button>
        </div>
      </section>

      <section className="flex items-center gap-x-12">
        {CERTS.map((cert) => (
          <CertShowcase image={cert.image} label={cert.label} />
        ))}
      </section>

      <div className="flex min-w-full justify-between pt-8">
        <Link href="/about">
          <Button variant="outline" asChild>
            <span>
              <ArrowLeft className="mr-0.5 h-5 w-5" />
              <p className="mr-1 hidden md:block">Back to:</p>
              About
            </span>
          </Button>
        </Link>
        <Link href="/about/projects">
          <Button variant="outline" asChild>
            <span>
              <p className="mr-1 hidden md:block">Next up:</p>
              Projects
              <ArrowRight className="ml-0.5 h-5 w-5" />
            </span>
          </Button>
        </Link>
      </div>
    </>
  )
}
