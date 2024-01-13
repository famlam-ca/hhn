import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Wrapper } from "@/components/wrapper";
import { Button } from "@/components/ui/button";

const Page = () => {
  return (
    <MaxWidthWrapper className="flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center">
      <Wrapper className="text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          Get in contact with me!
        </h1>
        <p className="mt-4 text-lg">
          Email me at:&nbsp;
          <span>
            <Button variant="link" className="cursor-text p-0">
              lasse@famlam.ca
            </Button>
          </span>
        </p>
      </Wrapper>
    </MaxWidthWrapper>
  );
};

export default Page;
