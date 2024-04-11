import { redirect, useSearchParams } from "next/navigation";
import { Suspense } from "react";

import { validateSession } from "@/lib/auth";

import { SignInForm } from "./_components/sign-in-form";
import SignInLoading from "./loading";

const SignInPage = async ({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) => {
  const { user } = await validateSession();

  if (user) {
    return redirect("/");
  }

  return (
    <Suspense fallback={<SignInLoading />}>
      <SignInForm callbackUrl={searchParams.callbackUrl} />
    </Suspense>
  );
};

export default SignInPage;
