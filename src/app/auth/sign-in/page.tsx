import { redirect } from "next/navigation";
import { Suspense } from "react";

import { validateSession } from "@/lib/lucia";

import { SignInForm } from "./_components/sign-in-form";
import SignInLoading from "./loading";

const SignInPage = async ({
  searchParams,
}: {
  searchParams: { callbackUrl: string };
}) => {
  const { session } = await validateSession();

  if (session) {
    return redirect(searchParams.callbackUrl ? searchParams.callbackUrl : "/");
  }

  return (
    <Suspense fallback={<SignInLoading />}>
      <SignInForm callbackUrl={searchParams.callbackUrl} />
    </Suspense>
  );
};

export default SignInPage;
