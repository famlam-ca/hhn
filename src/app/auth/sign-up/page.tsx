import { Suspense } from "react";

import { SignOutSkeleton, SignUpForm } from "./_components/sign-up-form";
// import { Test } from "./_components/test";

const Page = () => {
  return (
    <Suspense fallback={<SignOutSkeleton />}>
      <SignUpForm />
    </Suspense>
  );
};

export default Page;
