"use client";

import { cn } from "@/lib/utils";
import { useProfileSidebar } from "@/store/use-profile-sidebar";

export const Wrapper = ({ children }: React.PropsWithChildren) => {
  const { collapsed } = useProfileSidebar((state) => state);

  return (
    <nav
      className={cn(
        "fixed left-0 z-50 flex h-full w-[70px] flex-col border-r border-[#2D2E35] bg-background lg:w-60",
        collapsed && "lg:w-[70px]",
      )}
    >
      {children}
    </nav>
  );
};
