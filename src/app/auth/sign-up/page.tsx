import MaxWidthWrapper from "@/components/max-width-wrapper";
import { SignUpForm } from "./_components/sign-up-form";
// import { Test } from "./_components/test";

const Page = () => {
  return (
    <>
      <MaxWidthWrapper className="flex min-h-screen w-full items-center justify-center">
        <div className="w-full">
          <div className="mx-auto max-w-6xl px-6 lg:px-8">
            <div className="-m-2 rounded-xl bg-foreground/5 p-2 ring-1 ring-inset ring-ring/10 lg:-m-4 lg:rounded-2xl lg:p-4">
              <div className="rounded-md bg-background/80 p-2 shadow-2xl ring-1 ring-ring/10 sm:p-8 md:p-20">
                <SignUpForm />
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};

export default Page;
