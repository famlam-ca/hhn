"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { SignInForm, SignInSkeleton } from "./_components/sign-in-form";

const Page = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <Suspense fallback={<SignInSkeleton />}>
      <SignInForm callbackUrl={callbackUrl} />
    </Suspense>
  );
};

export default Page;
