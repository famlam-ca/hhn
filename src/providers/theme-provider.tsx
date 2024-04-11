"use client";

import { PropsWithChildren, useEffect, useState } from "react";
import { ThemeProvider as ThemeContext } from "next-themes";

export const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState<boolean>(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext attribute="class" defaultTheme="dark">
      {children}
    </ThemeContext>
  );
};
