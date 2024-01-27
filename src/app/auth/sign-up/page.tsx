import { Suspense } from "react";

import { SignUpForm } from "./_components/sign-up-form";
// import { Test } from "./_components/test";
import SignOutLoading from "./loading";

const Page = () => {
  return (
    <Suspense fallback={<SignOutLoading />}>
      <SignUpForm />
    </Suspense>
  );
};

export default Page;
