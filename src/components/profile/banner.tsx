"use client";

import Image from "next/image";

import { cn } from "@/lib/utils";
import { useProfileSidebar } from "@/store/use-profile-sidebar";

interface BannerProps {
  username: string;
  banner: string;
}

export const Banner = ({ username, banner }: BannerProps) => {
  const { collapsed } = useProfileSidebar((state) => state);

  return (
    <div
      className={cn(
        "relative -mb-6 w-[calc(100vw-70px)] lg:-mb-10 lg:w-[calc(100vw-15rem)]",
        collapsed && "lg:w-[calc(100vw-70px)]",
      )}
    >
      <div className="h-40 blur-sm lg:h-60">
        {!banner ? (
          <Image
            src="/profile-banner.png"
            alt="Profile banner"
            fill
            objectFit="cover"
          />
        ) : (
          <Image src={banner} alt="Profile banner" fill objectFit="cover" />
        )}
      </div>
      <div className="absolute left-[50%] right-[50%] top-0 flex h-full flex-col items-center justify-center text-center font-bold tracking-widest">
        <h1 className="text-shadow text-6xl text-white lg:text-8xl">
          {username}
        </h1>
      </div>
    </div>
  );
};
