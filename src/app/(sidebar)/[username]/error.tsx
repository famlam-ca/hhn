"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import MaxWidthWrapper from "@/components/max-width-wrapper";

const ErrorPage = () => {
  return (
    <MaxWidthWrapper className="h-full">
      <div className="flex h-full flex-col items-center justify-center space-y-4 text-text">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          OO<span className="text-primary">PS!</span> :(
        </h1>
        <p className="text-lg text-muted-foreground">
          Looks like something went wrong.
        </p>
        <Button variant="secondary" asChild>
          <Link href="/">Go back home</Link>
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default ErrorPage;
