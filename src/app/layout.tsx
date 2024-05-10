import type { Metadata } from "next";
import { Inter } from "next/font/google";

import { validateSession } from "@/lib/lucia";
import { cn } from "@/lib/utils";
import { Providers } from "@/providers";
import { SessionProvider } from "@/providers/session-provider";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Humble Home Network",
  description: "A home for friends and family, make yourself confortable.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sessionData = await validateSession();

  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          "min-h-screen font-sans text-text antialiased",
          inter.className,
        )}
      >
        <SessionProvider sessionData={sessionData}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
