"use client";

import { CustomUser } from "@/types/types";
import { useUserToken } from "@/hooks/use-user-token";
import MaxWidthWrapper from "@/components/max-width-wrapper";

import { Bio, BioSkeleton } from "./bio";
import { Header, HeaderSkeleton } from "./header";
import { Banner } from "./banner";

interface ProfileProps {
  user: CustomUser;
}

export const Profile = ({ user }: ProfileProps) => {
  const { identity } = useUserToken(user.id);

  if (!identity) {
    return <ProfileSkeleton />;
  }

  return (
    <div>
      <Banner username={user.username} banner={user.banner} />

      <MaxWidthWrapper className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
        <div className="flex items-center">
          <Header
            username={user.username}
            email={user.email}
            image={user.image}
            role={user.role}
          />
        </div>
        <Bio username={user.username} bio={user.bio} />
      </MaxWidthWrapper>
    </div>
  );
};

export const ProfileSkeleton = () => {
  return (
    <MaxWidthWrapper>
      <div className="grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6">
        <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
          <HeaderSkeleton />
          <BioSkeleton />
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
