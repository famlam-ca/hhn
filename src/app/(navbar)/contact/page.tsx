"use client"

import { ArrowRight, Github, Linkedin, Mail } from "lucide-react"
import Link from "next/link"

import { Hint } from "@/components/hint"
import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Wrapper } from "@/components/wrapper"

const ContactPage = () => {
  const text = "lasse@famlam.ca"

  const onClick = () => {
    window.location.href = `mailto:${text}`
  }

  return (
    <MaxWidthWrapper className="flex h-full w-full items-center justify-center">
      <Wrapper className="flex flex-col items-center justify-center gap-6 max-sm:space-y-6 sm:flex-row">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            Get in contact with me!
          </h1>
          <div className="mt-4 space-y-4 text-lg">
            <p>
              I'm always open to new opportunities, so if you have a project you
              want to work on, or just want to chat, feel free to reach out to
              me!
            </p>

            <p className="font-bold">You can find me here:</p>
            <div className="flex items-center gap-x-4">
              <Link href="https://github.com/SlickYeet" target="_blank">
                <Hint label="Github" side="bottom" asChild>
                  <Github className="h-6 w-6" />
                </Hint>
              </Link>
              <Link
                href="https://www.linkedin.com/in/lasse-lammers-90a050234/"
                target="_blank">
                <Hint label="LinkedIn" side="bottom" asChild>
                  <Linkedin className="h-6 w-6" />
                </Hint>
              </Link>
              <button onClick={onClick}>
                <Hint label={text} side="bottom" asChild>
                  <Mail className="h-6 w-6" />
                </Hint>
              </button>
            </div>

            <p className="font-bold">More about me and what I do:</p>

            <div className="flex items-center gap-x-4">
              <Button variant="link" size="none" asChild>
                <Link href="/slickyeet">@SlickYeet</Link>
              </Button>
              <Button variant="link" size="none" asChild>
                <Link href="/about">
                  Learn more
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="link" size="none" asChild>
                <Link href="/about/projects">
                  Projects
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center gap-4">
          <Avatar className="aspect-square h-52 w-52 outline outline-offset-8 outline-border sm:h-80 sm:w-80">
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
      </Wrapper>
    </MaxWidthWrapper>
  )
}

export default ContactPage
