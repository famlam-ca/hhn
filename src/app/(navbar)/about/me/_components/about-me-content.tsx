"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";
import { Wrapper } from "@/components/wrapper";

export const AboutMeContent = () => {
  return (
    <>
      <div className="mt-8 h-64 bg-aboutBanner">
        <div className="flex h-full flex-col items-center justify-center text-center font-bold tracking-widest backdrop-blur-sm">
          <h1 className="text-6xl text-white sm:text-8xl">About</h1>
          <h2 className="text-primary">SlickYeet</h2>
        </div>
      </div>

      <MaxWidthWrapper className="my-8 min-h-[calc(100vh-3.5rem)]">
        <Wrapper className="space-y-6">
          <section>
            <i>Work in progress</i>
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
            {/* TODO: make more content */}
            <Link href="#">
              <Button variant="outline" asChild>
                <span>
                  <p className="mr-1">Next up:</p>
                  Coming Soon
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
