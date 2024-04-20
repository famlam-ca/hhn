"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Button } from "@/components/ui/button";

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

      <MaxWidthWrapper className="my-8 min-h-[calc(100vh-3.5rem)] space-y-6">
        <div className="flex min-w-full justify-between pb-8">
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
          <i>Work in progress</i>
        </section>

        <div className="flex min-w-full justify-between pt-8">
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
      </MaxWidthWrapper>
    </>
  );
};
