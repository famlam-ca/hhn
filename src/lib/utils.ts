import { Metadata } from "next";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string) {
  if (typeof window !== "undefined") return path;
  if (process.env.VERCEL_URL) return `https://www.famlam.ca${path}`;
  return `http://localhost:${process.env.PORT ?? 3000}${path}`; // dev
  // return `https://www.famlam.ca}${path}`; // prod
}

export function constructMetadata({
  title = "HHN - a Humble Home Network",
  description = "Famlam is the home of HHN, a place for friends and family.",
  // image = "/thumbnail.png",
  icons = "/favicon.ico",
  noIndex = false,
}: {
  title?: string;
  description?: string;
  image?: string;
  icons?: string;
  noIndex?: boolean;
} = {}): Metadata {
  return {
    title,
    description,
    openGraph: {
      title,
      description,
      // images: [
      //   {
      //     url: image,
      //   },
      // ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      // images: [image],
      creator: "@SlickYeet",
    },
    icons,
    metadataBase: new URL("https://www.famlam.ca"),
    themeColor: "#81c3fd",
    ...(noIndex && {
      robots: {
        index: false,
        follow: false,
      },
    }),
  };
}
