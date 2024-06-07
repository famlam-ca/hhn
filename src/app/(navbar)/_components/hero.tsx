"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { MaxWidthWrapper } from "@/components/max-width-wrapper"
import { buttonVariants } from "@/components/ui/button"
import { Wrapper } from "@/components/wrapper"

export const Hero = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 100 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5 }}>
        <MaxWidthWrapper className="mb-12 mt-28 flex flex-col items-center justify-center text-center sm:mt-40">
          <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-border bg-foreground px-7 py-2 shadow-md backdrop-blur transition-all hover:border-border/80 hover:bg-secondary/80">
            <p className="text-sm font-semibold text-text">
              Welcome, enjoy your stay!
            </p>
          </div>
          <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl">
            Humble <span className="text-primary">Home Network</span>
          </h1>
          <p className="mt-5 max-w-prose sm:text-lg">
            A home for friends and family, make yourself confortable.
          </p>
          <Link
            href="/about"
            className={buttonVariants({
              variant: "secondary",
              size: "lg",
              className: "mt-5",
            })}>
            Learn More
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </MaxWidthWrapper>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}>
        <Wrapper>
          <Image
            src="/landing-banner.png"
            alt="Home banner"
            width={1917}
            height={931}
            quality={100}
          />
        </Wrapper>
      </motion.div>
    </>
  )
}
