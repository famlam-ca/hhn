"use client";

import { MaxWidthWrapper } from "@/components/max-width-wrapper";
import { CustomUser } from "@/types";

import { Banner, BannerSkeleton } from "./banner";
import { Bio, BioSkeleton } from "./bio";
import { Header, HeaderSkeleton } from "./header";

export const Profile = ({ user }: { user: CustomUser }) => {
  return (
    <div>
      <Banner display_name={user.display_name} />

      <MaxWidthWrapper className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
        <div className="flex items-center">
          <Header
            username={user.username}
            display_name={user.display_name}
            image={user.image}
            role={user.role}
          />
        </div>
        <Bio bio={user.bio} />
      </MaxWidthWrapper>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <>
      <BannerSkeleton />

      <MaxWidthWrapper>
        <HeaderSkeleton />
        <BioSkeleton />
      </MaxWidthWrapper>
    </>
  );
};
