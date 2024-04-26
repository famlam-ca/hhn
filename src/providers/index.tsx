import { PropsWithChildren } from "react";

import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./toast-provider";

export const Providers = ({ children }: PropsWithChildren) => {
  return (
    <ThemeProvider>
      {children}
      <Toaster />
    </ThemeProvider>
  );
};
