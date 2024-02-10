import { PropsWithChildren } from "react";

import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "./theme-provider";
import { Toaster } from "./toast-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <ThemeProvider>
        {children}
        <Toaster />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default Providers;
