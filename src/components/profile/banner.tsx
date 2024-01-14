"use client";

import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface BannerProps {
  username: string;
}

export const Banner = ({ username }: BannerProps) => {
  return (
    <div className={cn("relative -mb-6 lg:-mb-10")}>
      <div className="h-40 blur-sm lg:h-60">
        <Image
          src="/profile-banner.png"
          alt="Profile banner"
          fill
          objectFit="cover"
        />
      </div>
      <div className="absolute left-[50%] right-[50%] top-0 flex h-full flex-col items-center justify-center text-center font-bold tracking-widest">
        <h1 className="text-shadow text-6xl text-white lg:text-8xl">
          {username}
        </h1>
      </div>
    </div>
  );
};

export const BannerSkeleton = () => {
  return <Skeleton className="-mb-6 h-40 lg:-mb-10 lg:h-60" />;
};
