import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import "react-circular-progressbar/dist/styles.css";

import { cn } from "@/lib/utils";
import Providers from "@/providers/providers";
import Footer from "@/components/Footer";

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
      <body
        className={cn(
          "min-h-screen font-sans text-text antialiased",
          inter.className,
        )}
      >
        <Providers>
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
