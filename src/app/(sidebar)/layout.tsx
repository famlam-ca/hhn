import { PropsWithChildren } from "react";

import Sidebar from "@/components/navigation/Sidebar";

const SidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Sidebar />
      {children}
    </>
  );
};

export default SidebarLayout;
