"use client";

import { useUserToken } from "@/hooks/use-user-token";
import { Skeleton } from "@/components/ui/skeleton";
import MaxWidthWrapper from "@/components/max-width-wrapper";

import { Bio } from "./bio";
import { Header, HeaderSkeleton } from "./header";
import { Info } from "./info";

type CustomUser = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string | null;
  image: string;
  role: string;
};

interface ProfileProps {
  user: CustomUser;
}

export const Profile = ({ user }: ProfileProps) => {
  const { identity } = useUserToken(user.id);

  return (
    <MaxWidthWrapper>
      <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
        <Header username={user.username} image={user.image} role={user.role} />
        <Info
          userId={user.id}
          username={user.username}
          firstName={user.first_name}
          lastName={user.last_name}
          email={user.email}
          identity={identity}
          image={user.image}
        />
        <Bio
          username={user.username}
          userId={user.id}
          identity={identity}
          bio={user.bio}
        />
      </div>
    </MaxWidthWrapper>
  );
};

export const ProfileSkeleton = () => {
  return (
    <div className="grid h-full grid-cols-1 lg:grid-cols-3 lg:gap-y-0 xl:grid-cols-3 2xl:grid-cols-6">
      <div className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
        <HeaderSkeleton />
      </div>
      <div className="col-span-1 bg-background">
        <Skeleton />
      </div>
    </div>
  );
};
