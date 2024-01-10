"use client";

import Image from "next/image";

interface BannerProps {
  username: string;
  banner: string;
}

export const Banner = ({ username, banner }: BannerProps) => {
  return (
    <div className="relative -mb-6 w-[calc(100vw-70px)] lg:-mb-10 lg:w-[calc(100vw-15rem)]">
      <Image
        src="/about-banner.png"
        alt="Profile banner"
        width={1920}
        height={1080}
        className="h-40 blur-sm lg:h-60"
      />
      <div className="absolute left-[50%] right-[50%] top-0 flex h-full flex-col items-center justify-center text-center font-bold tracking-widest">
        <h1 className="text-6xl lg:text-8xl">{username}</h1>
      </div>
    </div>
  );
};
