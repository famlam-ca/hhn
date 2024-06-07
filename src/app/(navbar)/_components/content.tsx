"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { TypeAnimation } from "react-type-animation"

import { Wrapper } from "@/components/wrapper"
import { TABS } from "@/constants/home-tabs"

import { Tab } from "./tab"

export const HomeContent = () => {
  const { scrollYProgress } = useScroll()

  const ref = useRef(null)
  const isInView = useInView(ref, { amount: 1, once: true })

  return (
    <div className="mx-auto mb-32 mt-32 max-w-5xl sm:mt-56" id="content">
      <motion.div
        style={{
          scale: useTransform(
            scrollYProgress,
            [0, 0.2, 0.8, 1],
            [0.5, 0.5, 1, 1],
          ),
        }}>
        <div className="mb-12 px-6 lg:px-8">
          <div className="prose mx-auto max-w-2xl text-center lg:prose-lg">
            <h2 className="my-2 text-3xl font-bold text-text sm:text-5xl">
              <TypeAnimation
                sequence={[
                  "HHN",
                  1000,
                  "Humble Home Network",
                  1000,
                  "Enjoy your stay!",
                  1000,
                ]}
                wrapper="span"
                speed={50}
                deletionSpeed={69}
                repeat={Infinity}
              />
            </h2>
            <p className="mt-4 text-balance bg-gradient-to-r from-muted to-muted-foreground bg-clip-text text-lg text-transparent">
              Stay and explore for a while. Around here you can learn about my
              current and past projects.
            </p>
          </div>
        </div>
      </motion.div>

      <div ref={ref}>
        <ol className="my-8 space-y-4 pt-8 md:flex md:space-x-12 md:space-y-0">
          {TABS.map((tab, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: isInView ? 1 : 0 }}
              transition={{ delay: i * 0.2 }}>
              <Tab
                icon={tab.icon}
                title={tab.title}
                description={tab.description}
                href={tab.href}
                hrefLabel={tab.hrefLabel}
              />
            </motion.li>
          ))}
        </ol>
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.5, y: 100 }}
        animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0, y: 0 }}
        transition={{ duration: 0.5 }}>
        <Wrapper>
          <Image
            src="/project-banner.png"
            alt="project list"
            width={1920}
            height={1080}
            quality={100}
          />
        </Wrapper>
      </motion.div>
    </div>
  )
}
