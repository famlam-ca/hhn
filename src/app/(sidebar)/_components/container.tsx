"use client";

import { useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";

import { useProfileSidebar } from "@/store/use-profile-sidebar";
import { cn } from "@/lib/utils";

export const Container = ({ children }: React.PropsWithChildren) => {
  const { collapsed, onCollapse, onExpand } = useProfileSidebar(
    (state) => state,
  );
  const matches = useMediaQuery("(min-width: 1024px)");

  useEffect(() => {
    if (matches) {
      onExpand();
    } else {
      onCollapse();
    }
  }, [matches, onCollapse, onExpand]);

  return (
    <div
      className={cn("flex-1", collapsed ? "ml-[70px]" : "ml-[70px] lg:ml-60")}
    >
      {children}
    </div>
  );
};
