import { PropsWithChildren } from "react";

import { Sidebar } from "./_components/sidebar/index";
import { Container } from "./_components/container";

const SidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="flex h-full">
      <Sidebar />
      <Container>{children}</Container>
    </div>
  );
};

export default SidebarLayout;
