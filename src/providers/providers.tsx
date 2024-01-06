import { PropsWithChildren } from "react";
import AuthProvider from "./auth-provider";
import TRPCProvider from "./trpc-providers";
import ThemeProvider from "./theme-provider";
import { Toaster } from "./toast-provider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <TRPCProvider>
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </TRPCProvider>
    </AuthProvider>
  );
};

export default Providers;
