import { ReactNode } from "react";

import { cn } from "@/lib/utils";

export const Wrapper = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("w-full", className)}>
      <div className={cn("mx-auto max-w-6xl px-6 lg:px-8", className)}>
        <div
          className={cn(
            "-m-2 rounded-xl bg-foreground/5 p-2 ring-1 ring-inset ring-ring/10 lg:-m-4 lg:rounded-2xl lg:p-4",
            className,
          )}
        >
          <div
            className={cn(
              "rounded-md bg-background/80 p-2 shadow-2xl ring-1 ring-ring/10 sm:p-8 md:p-20",
              className,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
