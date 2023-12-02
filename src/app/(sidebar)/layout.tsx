import { PropsWithChildren } from "react";

import Sidebar from "@/components/navigation/Sidebar";

const SidebarLayout = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <Sidebar />
      {children}
    </div>
  );
};

export default SidebarLayout;
