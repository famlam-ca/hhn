import { PropsWithChildren } from "react";

import { Sidebar } from "./_components/sidebar/index";
import { Container } from "./_components/container";

const SidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Sidebar />
      <Container>{children}</Container>
    </>
  );
};

export default SidebarLayout;
