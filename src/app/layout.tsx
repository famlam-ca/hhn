import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
// import "react-loading-skeleton/dist/skeleton.css";

import { cn } from "@/lib/utils";
import Providers from "@/providers/providers";
import { Toaster } from "@/providers/ToastProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Humble Home Network",
  description: "Home of famlam.ca",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <Providers>
        <body
          className={cn(
            "min-h-screen font-sans text-text antialiased",
            inter.className,
          )}
        >
          <Toaster />
          {children}
        </body>
      </Providers>
    </html>
  );
}
