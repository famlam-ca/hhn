"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { SignInForm } from "./_components/sign-in-form";
import SignInLoading from "./loading";

const Page = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";

  return (
    <Suspense fallback={<SignInLoading />}>
      <SignInForm callbackUrl={callbackUrl} />
    </Suspense>
  );
};

export default Page;
