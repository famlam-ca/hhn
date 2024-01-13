import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { Navbar } from "./_components/nav";

const DocsLayout = ({ children }: React.PropsWithChildren) => {
  return (
    <>
      <Navbar />
      <MaxWidthWrapper>{children}</MaxWidthWrapper>
    </>
  );
};

export default DocsLayout;
