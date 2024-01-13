"use client";

import Link from "next/link";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";

const AboutContent = () => {
  return (
    <>
      <div className="mt-8 h-80 bg-aboutBanner">
        <div className="flex h-full flex-col items-center justify-center text-center font-bold tracking-widest backdrop-blur-sm">
          <h1 className="text-6xl text-white sm:text-8xl">About</h1>
          <h2 className="text-primary">A Humble Home Network</h2>
        </div>
      </div>

      <MaxWidthWrapper className="my-8">
        <Wrapper>
          <article className="space-y-6">
            {/* Why? */}
            <div>
              <h2 className="font-bold text-muted">Why do I do what I do?</h2>

              <div className="my-8 h-px self-center rounded bg-border" />

              <p>
                Initially my plan was to create a place for me to collect all
                and any data that I wished to display, in a central location.
                This led me down the path of learning basic{" "}
                <Link
                  target="_blank"
                  href="https://en.wikipedia.org/wiki/HTML5"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  HTML5
                </Link>{" "}
                and{" "}
                <Link
                  target="_blank"
                  href="https://en.wikipedia.org/wiki/CSS"
                  className="text-primary underline-offset-2 hover:underline"
                >
                  CSS
                </Link>
                .<p>...</p>
              </p>
            </div>

            {/* How did it start? */}
            <div>
              <h2 className="font-bold text-muted">
                How did it start? - What I did to get here.
              </h2>

              <div className="my-8 h-px self-center rounded bg-border" />

              <div className="space-y-2">
                <p>
                  Way back, around 2015, I started building Minecraft servers
                  for my friends and myself. This started me off on my journey
                  developing a homelab. Although at the beginning services were
                  running on my PC, I would soon get my hands on spare parts to
                  use as my first server. The lab has come a long way since
                  then. Even though the machines are still old PCs, they are
                  much more powerful.
                </p>
                <p>
                  Upgrades over the years have allowed me to run more and more
                  services, and expand my network. At some point during my
                  additions to my network I had the idea of localizing
                  management, since I was jumping around quite a lot between
                  VMs, containers, and GUIs. Eventually I decided to start
                  creating a website, with the plan to use established systems
                  to manage everything from one interface.
                </p>
                <p>
                  As previously mentioned I wanted to create a localized web
                  interface for services running on my network. And after I had
                  created my first{" "}
                  <HoverCard>
                    <HoverCardTrigger asChild>
                      <Button variant="link" className="px-0">
                        webpage
                      </Button>
                    </HoverCardTrigger>
                    <Link target="_blank" href="https://old.famlam.ca">
                      <HoverCardContent className="group/hoverContent w-80">
                        <div className="flex justify-between space-x-4">
                          <Avatar>
                            <AvatarImage
                              src={"https://github.com/famlam-ca.png"}
                            />
                            <AvatarFallback>HHN</AvatarFallback>
                          </Avatar>
                          <div className="space-y-1">
                            <h4 className="text-base font-semibold text-primary group-hover/hoverContent:underline">
                              old.famlam.ca
                            </h4>
                            <p className="text-sm text-muted">
                              The first design concept of www.famlam.ca.
                            </p>
                          </div>
                        </div>
                      </HoverCardContent>
                    </Link>
                  </HoverCard>{" "}
                  using HTML and CSS I moved on, trying to implement some
                  functionalities, since at the moment it was just an interface.
                  However, anyone with any amount of experience with a web UI
                  would realize that the old UI was hardly fit to host any
                  functionality, such as server statics.
                </p>
                <p>
                  This is why I went through several iterations of the
                  now-called dashboard.{" "}
                  <span className="text-muted">
                    {"(The first being the one at "}
                    <Link target="_blank" href="https://old.famlam.ca">
                      <Button
                        variant="link"
                        className="px-0 text-muted underline underline-offset-2 hover:text-primary"
                      >
                        old.famlam.ca
                      </Button>
                    </Link>
                    {")"}
                  </span>{" "}
                  During this process I started to create other pages, at the
                  beginning simply because I was procrastinating the
                  making/redesign of the dashboard, but later on because I
                  wanted a more rounded experience. At this point this project
                  has developed and is developing faster and better than ever
                  before. I still have a lot to learn. Trust me I know I am
                  still in the early stages of programming. However, I now have
                  a goal and a vision that hopefully can fulfill my expectations
                  of this project.
                </p>
                <p>...</p>
              </div>
            </div>

            {/* End Goal? */}
            <div>
              <h2 className="font-bold text-muted">
                Whats the end goal? - What I want out Of this project.
              </h2>

              <div className="my-8 h-px self-center rounded bg-border" />

              <div>
                <p>
                  Speaking of expectations mine are way to high. That being said
                  I don
                  {"'"}t think this is a bad thing. Although I do feature creep
                  a lot, these additions allow me to learn and explore
                  alternatives to features and practices I already know.
                </p>
                <p>...</p>
              </div>
            </div>
          </article>
        </Wrapper>
      </MaxWidthWrapper>
    </>
  );
};

export default AboutContent;
