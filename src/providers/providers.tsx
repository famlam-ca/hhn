import { PropsWithChildren } from "react";
import AuthProvider from "./authProvider";
import TRPCProvider from "./TRPCProviders";
import ThemeProvider from "./themeProvider";
import { Toaster } from "./ToastProvider";

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
