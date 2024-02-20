import { Suspense } from "react";

import { RegisterForm } from "./_components/register-form";
import { SignUpForm } from "./_components/sign-up-form";
import SignOutLoading from "./loading";

const Page = () => {
  return (
    <Suspense fallback={<SignOutLoading />}>
      {/* <SignUpForm /> */}
      <RegisterForm />
    </Suspense>
  );
};

export default Page;
