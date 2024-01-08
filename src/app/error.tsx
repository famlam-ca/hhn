"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/max-width-wrapper";
import Wrapper from "@/components/wrapper";

const ErrorPage = () => {
  return (
    <>
      {/* deco */}
      <div className="relative">
        {/* left */}
        <div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-56"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 top-10 -z-10 transform-gpu overflow-hidden blur-3xl sm:top-56"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative left-[calc(50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-36rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>

        {/* right */}
        <div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-48 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-[30rem]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative right-[calc(-50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[180deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:right-[calc(-50%-80rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -bottom-48 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-[30rem]"
          >
            <div
              style={{
                clipPath:
                  "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
              }}
              className="relative right-[calc(-50%-13rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[180deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:right-[calc(-50%-86rem)] sm:w-[72.1875rem]"
            />
          </div>
        </div>
      </div>

      <MaxWidthWrapper className="flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center">
        <Wrapper className="space-y-4 text-center">
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
            OO<span className="text-primary">PS!</span> :(
          </h1>
          <p className="text-lg text-muted-foreground">
            Looks like something went wrong.
          </p>
          <Button variant="secondary" asChild>
            <Link href="/">Go back home</Link>
          </Button>
        </Wrapper>
      </MaxWidthWrapper>
    </>
  );
};

export default ErrorPage;
