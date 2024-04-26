"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";

import { CertShowcase } from "./cert-showcase";

export const AboutMeContent = () => {
  const certs = [
    {
      src: "/certs/nse4-fortinet-certified-associate.png",
      alt: "nse4-fortinet-certified-associate",
    },
    {
      src: "/certs/edu-120-firewall-essentials.png",
      alt: "edu-120-firewall-essentials",
    },
    {
      src: "/certs/aws-academy-cloud-architechting.png",
      alt: "aws-academy-cloud-architechting",
    },
  ];

  return (
    <>
      <div className="mt-8 h-48 bg-aboutBanner">
        <div className="flex h-full flex-col items-center justify-center text-center font-bold tracking-widest backdrop-blur-sm">
          <h1 className="text-6xl text-white sm:text-8xl">About</h1>
          <h2>
            SLICK<span className="text-primary">YEET</span>
          </h2>
        </div>
      </div>

      <MaxWidthWrapper className="my-8 min-h-[calc(100vh-3.5rem)]">
        <Wrapper className="space-y-6">
          <div className="flex min-w-full justify-between pb-8">
            <Link href="/about">
              <Button variant="outline" asChild>
                <span>
                  <ArrowLeft className="ml-0.5 h-5 w-5" />
                  <p className="mr-1">Back to:</p>
                  About
                </span>
              </Button>
            </Link>
            <Link href="/about/projects">
              <Button variant="outline" asChild>
                <span>
                  <p className="mr-1">Next up:</p>
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

              <article>
                <p>
                  As a full-time student at BCIT pursuing my studies in Computer
                  Information Systems Administration{" "}
                  <Button variant="link" size="none" asChild>
                    <Link
                      href="https://www.bcit.ca/programs/computer-information-systems-administration-diploma-full-time-1930dipma/"
                      target="_blank"
                    >
                      (CISA)
                    </Link>
                  </Button>
                  , I am deeply immersed in the world of technology. My journey
                  began with a fervent passion for all things IT and web
                  development, a flame that continues to burn brightly as I
                  navigate the complexities of this ever-evolving field.
                </p>
                <br />
                <p>
                  Driven by a relentless curiosity and a desire to master the
                  intricacies of systems administration and integration, I am on
                  a quest to carve out my place in the realm of IT. With a keen
                  eye for detail and a knack for problem-solving, I approach
                  every challenge as an opportunity for growth and learning.
                  Whether it&apos;s delving into the intricacies of server
                  management or diving headfirst into the world of web
                  development, I am constantly seeking to expand my knowledge
                  and refine my skills.
                </p>
                <br />
                <p>
                  Through dedication, perseverance, and a genuine love for what
                  I do, I am charting a course towards my dream of becoming a
                  systems administrator and integrator. With each step forward,
                  I am not only shaping my own future but also contributing to
                  the ever-expanding tapestry of innovation and progress in the
                  world of technology.
                </p>
                <br />
                <p>
                  Thanks for dropping by! Whether you&apos;re here to explore my
                  projects or interested in collaboration, I&apos;m all ears.
                  Feel free to reach out to me{" "}
                  <Button variant="link" size="none" asChild>
                    <Link href="/contact">here</Link>
                  </Button>
                  , for inquiries or just to chat about anything tech-related,
                  from web development to the latest trends in IT. Let&apos;s
                  connect and embark on this journey together!
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
                className="cursor-default font-extrabold hover:bg-transparent"
              >
                Hi, I&apos;m Lasse!
              </Button>
            </div>
          </section>

          <section className="flex items-center gap-x-12">
            {certs.map((cert) => (
              <CertShowcase src={cert.src} alt={cert.alt} />
            ))}
          </section>

          <div className="flex min-w-full justify-between pt-8">
            <Link href="/about">
              <Button variant="outline" asChild>
                <span>
                  <ArrowLeft className="ml-0.5 h-5 w-5" />
                  <p className="mr-1">Back to:</p>
                  About
                </span>
              </Button>
            </Link>
            <Link href="/about/projects">
              <Button variant="outline" asChild>
                <span>
                  <p className="mr-1">Next up:</p>
                  Projects
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
