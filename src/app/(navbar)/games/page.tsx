import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Wrapper } from "@/components/wrapper";

const GameHubPage = () => {
  return (
    <MaxWidthWrapper className="flex min-h-[calc(100vh-3.5rem)] w-full items-center justify-center text-center">
      <Wrapper>
        <h1 className="text-center text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          GA<span className="text-primary">MES</span>
        </h1>
        <i>Work in progress</i>
      </Wrapper>
    </MaxWidthWrapper>
  );
};

export default GameHubPage;
