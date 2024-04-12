import Link from "next/link";

import { Icons } from "@/components/icons";
import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { VerifyEmail } from "@/components/verify-email";
import { Wrapper } from "@/components/wrapper";

interface VerifyEmailPageProps {
  searchParams: {
    email: string;
  };
}

const VerifyEmailPage = ({ searchParams }: VerifyEmailPageProps) => {
  return (
    <MaxWidthWrapper className="flex min-h-screen w-full items-center justify-center">
      <Wrapper className="relative">
        <div className="mx-auto mb-10 flex flex-col items-center justify-center space-y-4">
          <Link href="/" className="z-40 flex items-center gap-2">
            <Icons.logo className="h-8 w-8 fill-text" />
            <h2 className="text-xl font-bold">
              H<span className="text-primary">HN</span>
            </h2>
          </Link>
          <h1 className="text-center text-3xl font-bold leading-9 tracking-tight md:text-4xl lg:text-5xl">
            Verify Your Email
          </h1>
        </div>

        <div className="space-y-8 text-center sm:mx-auto sm:w-full sm:max-w-md">
          <div>
            <p>Check your email for a verification link.</p>
            <p>After verifing you can close this window.</p>
          </div>
          <VerifyEmail email={searchParams.email} />
        </div>
      </Wrapper>
    </MaxWidthWrapper>
  );
};

export default VerifyEmailPage;
