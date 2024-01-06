import { PropsWithChildren } from "react";

import Sidebar from "./_components/sidebar";

const SidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen">
      <Sidebar>{children}</Sidebar>
    </div>
  );
};

export default SidebarLayout;
