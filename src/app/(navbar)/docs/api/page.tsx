import MaxWidthWrapper from "@/components/max-width-wrapper";
import Wrapper from "@/components/wrapper";

const Page = () => {
  return (
    <MaxWidthWrapper className="flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center">
      <Wrapper>
        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          A<span className="text-primary">PI</span>
        </h1>
      </Wrapper>
    </MaxWidthWrapper>
  );
};

export default Page;
