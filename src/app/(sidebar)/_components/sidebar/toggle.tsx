"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowLeftFromLine, ArrowRightFromLine } from "lucide-react";

import { Hint } from "@/components/hint";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useProfileSidebar } from "@/store/use-profile-sidebar";

export const Toggle = () => {
  const pathname = usePathname();
  const path = pathname.split("/").filter(Boolean)[0];

  const { collapsed, onExpand, onCollapse } = useProfileSidebar(
    (state) => state,
  );

  const label = collapsed ? "Expand" : "Collapse";

  return (
    <>
      {collapsed && (
        <div className="flex w-full flex-col items-center justify-center">
          <div className="mt-8 flex items-center justify-center">
            <Link href="/">
              <Icons.logo className="h-8 w-8 fill-text" />
            </Link>
          </div>
          <div className="hidden items-center p-3 pl-6 pt-0 lg:flex">
            <Hint label={label} side="right" asChild>
              <Button onClick={onExpand} variant="ghost" className="h-auto p-2">
                <ArrowRightFromLine className="h-4 w-4" />
              </Button>
            </Hint>
          </div>
        </div>
      )}
      {!collapsed && (
        <div className="mb-2 hidden w-full flex-col lg:flex">
          <div className="m-8 flex items-center justify-center">
            <Link href="/" className="flex items-center gap-2">
              <Icons.logo className="h-8 w-8 fill-text" />
              <h2 className="text-xl font-bold">
                H<span className="text-primary">HN</span>
              </h2>
            </Link>
          </div>
          <div className="flex items-center p-3 pl-6 pt-0">
            <p className="font-semibold capitalize text-text">{path}</p>
            <Hint label={label} side="right" asChild>
              <Button
                onClick={onCollapse}
                variant="ghost"
                className="ml-auto h-auto p-2"
              >
                <ArrowLeftFromLine className="h-4 w-4" />
              </Button>
            </Hint>
          </div>
        </div>
      )}
    </>
  );
};
