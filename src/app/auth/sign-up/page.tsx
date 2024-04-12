import { redirect } from "next/navigation";
import { Suspense } from "react";

import { validateSession } from "@/lib/lucia";

import { SignUpForm } from "./_components/sign-up-form";
import SignUpLoading from "./loading";

const SignUpPage = async () => {
  const { user } = await validateSession();

  if (user) {
    return redirect("/");
  }

  return (
    <Suspense fallback={<SignUpLoading />}>
      <SignUpForm />
    </Suspense>
  );
};

export default SignUpPage;
