import { PropsWithChildren } from "react";
import AuthProvider from "./authProvider";
import TRPCProvider from "./TRPCProviders";
import ThemeProvider from "./themeProvider";

const Providers = ({ children }: PropsWithChildren) => {
  return (
    <AuthProvider>
      <TRPCProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </TRPCProvider>
    </AuthProvider>
  );
};

export default Providers;
