"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Hint } from "@/components/hint";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { Wrapper } from "@/components/wrapper";

const AboutContent = () => {
  return (
    <>
      <div className="mt-8 h-64 bg-aboutBanner">
        <div className="flex h-full flex-col items-center justify-center text-center font-bold tracking-widest backdrop-blur-sm">
          <h1 className="text-6xl text-white sm:text-8xl">About</h1>
          <h2 className="text-primary">A Humble Home Network</h2>
        </div>
      </div>

      <MaxWidthWrapper className="my-8">
        <Wrapper className="space-y-6">
          <section>
            <h2 className="font-bold text-muted-foreground">
              From Minecraft Servers to a Unified Web Interface: Tracing My
              Journey
            </h2>

            <div className="my-8 h-px self-center rounded bg-border" />

            <article>
              <p>
                Back in 2015, my journey into building Minecraft servers for
                myself and my friends sparked the inception of my Homelab.
                Initially, services ran on my PC, but soon, with some spare
                parts, I assembled my first server. Since then, my lab has
                evolved significantly, even though the hardware remains
                repurposed old PCs, now substantially more robust.
              </p>
              <br />
              <p>
                Over the years, upgrades have empowered me to host an expanding
                array of services and broaden my network. Amidst these
                expansions, I realized the need for localized management, as I
                found myself navigating between VMs, containers, and GUIs. This
                led me to conceive the idea of creating a unified web interface,
                culminating in the development of a website designed to
                streamline management across my network.
              </p>
              <br />
              <p>
                The journey to crafting this interface began with basic{" "}
                <HoverCard>
                  <Hint label="Hover me!" asChild>
                    <HoverCardTrigger className="h-0" asChild>
                      <span className="relative text-primary underline-offset-2 hover:underline">
                        HTML5
                      </span>
                    </HoverCardTrigger>
                  </Hint>
                  <Link
                    target="_blank"
                    href="https://en.wikipedia.org/wiki/HTML5"
                  >
                    <HoverCardContent className="group/hoverContent w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg" />
                          <AvatarFallback>HTML5</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-base font-semibold text-primary group-hover/hoverContent:underline">
                            HTML5
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            HTML5 (Hypertext Markup Language 5) is a markup
                            language.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </Link>
                </HoverCard>{" "}
                and{" "}
                <HoverCard>
                  <Hint label="Hover me!" asChild>
                    <HoverCardTrigger className="h-0" asChild>
                      <span className="relative text-primary underline-offset-2 hover:underline">
                        CSS
                      </span>
                    </HoverCardTrigger>
                  </Hint>
                  <Link
                    target="_blank"
                    href="https://en.wikipedia.org/wiki/CSS"
                  >
                    <HoverCardContent className="group/hoverContent w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src="https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg" />
                          <AvatarFallback>CSS</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-base font-semibold text-primary group-hover/hoverContent:underline">
                            CSS
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            Cascading Style Sheets (CSS) is a style sheet
                            language.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </Link>
                </HoverCard>{" "}
                for my initial webpage. However, it became apparent that the
                rudimentary UI lacked the sophistication required to support
                functionality like server management. Thus, multiple iterations
                ensued, leading to what is now known as the dashboard, initially
                hosted at{" "}
                <HoverCard>
                  <Hint label="Hover me!" asChild>
                    <HoverCardTrigger className="h-0" asChild>
                      <span className="relative text-primary underline-offset-2 hover:underline">
                        old.famlam.ca
                      </span>
                    </HoverCardTrigger>
                  </Hint>
                  <Link target="_blank" href="https://old.famlam.ca">
                    <HoverCardContent className="group/hoverContent w-80">
                      <div className="flex justify-between space-x-4">
                        <Avatar>
                          <AvatarImage src="https://github.com/famlam-ca.png" />
                          <AvatarFallback>HHN</AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <h4 className="text-base font-semibold text-primary group-hover/hoverContent:underline">
                            old.famlam.ca
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            The first design concept of www.famlam.ca.
                          </p>
                        </div>
                      </div>
                    </HoverCardContent>
                  </Link>
                </HoverCard>
                .
              </p>
              <br />
              <p>
                Throughout this iterative process, I found myself creating
                additional pages partly as a diversion from the dashboard's
                redesign, but also to enrich the overall user experience.
                Presently, this project is evolving at an accelerated pace, with
                much left to learn, especially considering my early stages in
                programming. Nonetheless, armed with a clear goal and vision,
                I'm optimistic about the project's potential to exceed
                expectations.
              </p>
            </article>
          </section>

          <section>
            <h2 className="font-bold text-muted-foreground">
              Envisioning the Future: Where My Journey Leads
            </h2>

            <div className="my-8 h-px self-center rounded bg-border" />

            <article>
              <p>
                Amidst the dynamic evolution of this project, my expectations
                soar high. While some might perceive this as a challenge, I
                embrace it as an opportunity for growth. Despite occasional
                bouts of feature creep, each addition serves as a pathway for
                learning and experimentation, offering insights into alternative
                features and practices.
              </p>
              <br />
              <p>
                Just as my journey from Minecraft servers to a unified web
                interface began with humble origins, the future of this project
                holds promises of continued growth and evolution. It's a path
                marked by curiosity, fueled by a relentless desire to explore
                the possibilities that lie ahead.
              </p>
              <br />
              <p>
                As I gaze into the horizon of this project, I see a landscape
                ripe with opportunities for innovation and discovery. Much like
                the early days of tinkering with spare parts to assemble my
                first server, the road ahead is paved with potential, waiting to
                be unlocked through ingenuity and perseverance.
              </p>
              <br />
              <p>
                My vision for this project extends beyond mere functionality;
                it's about building a platform that not only simplifies
                management within my network but also fosters a sense of
                community and collaboration. Just as I embarked on this journey
                to meet the needs of managing my expanding array of services,
                I'm committed to continuously refining and enhancing the user
                experience, one iteration at a time.
              </p>
              <br />
              <p>
                And just as the journey thus far has been marked by
                experimentation and learning, so too will the future be
                characterized by continuous growth and adaptation. With each new
                challenge comes an opportunity for discovery, an opportunity to
                expand my skill set and deepen my understanding of the
                ever-evolving landscape of technology.
              </p>
              <br />
              <p>
                In essence, the future of this project is not just about
                building a better interface or adding new features; it's about
                embarking on a journey of exploration and innovation, one that
                holds the promise of transforming the way we interact with and
                manage our digital infrastructure. And armed with a clear vision
                and an unwavering determination, I'm excited to see where this
                journey leads.
              </p>
            </article>
          </section>

          <div className="flex min-w-full justify-end pt-8">
            <Link href="/about/me">
              <Button variant="outline" asChild>
                <span>
                  <p className="mr-1">Next up:</p>
                  About me
                  <ArrowRight className="ml-0.5 h-5 w-5" />
                </span>
              </Button>
            </Link>
          </div>
        </Wrapper>
      </MaxWidthWrapper>
    </>
  );
};

export default AboutContent;
