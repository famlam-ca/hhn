"use client";

import { PropsWithChildren, useState, useEffect } from "react";
import { ThemeProvider as ThemeContext } from "next-themes";

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [isMounted, setIsMounted] = useState(false);

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

export default ThemeProvider;
