"use client";

import { useUserToken } from "@/hooks/use-user-token";
import MaxWidthWrapper from "@/components/max-width-wrapper";

import { Bio, BioSkeleton } from "./bio";
import { Header, HeaderSkeleton } from "./header";
import { EditProfileModal } from "./edit-profile-modal";

type CustomUser = {
  id: string;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  bio: string | null;
  image: string;
  role: string;
  theme: string;
};

interface ProfileProps {
  user: CustomUser;
}

export const Profile = ({ user }: ProfileProps) => {
  const { identity } = useUserToken(user.id);

  const ownerAsUser = `owner-${user.id}`;
  const isOwner = identity === ownerAsUser;

  if (!identity) {
    return <ProfileSkeleton />;
  }

  return (
    <MaxWidthWrapper className="hidden-scrollbar col-span-1 space-y-4 pb-10 lg:col-span-2 lg:overflow-y-auto xl:col-span-2 2xl:col-span-5">
      <div className="flex items-center">
        <Header username={user.username} image={user.image} role={user.role} />
        {isOwner && (
          <EditProfileModal
            username={user.username}
            first_name={user.first_name}
            last_name={user.last_name}
            email={user.email}
            image={user.image}
            userTheme={user.theme}
          />
        )}
      </div>
      <Bio username={user.username} userId={user.id} bio={user.bio} />
    </MaxWidthWrapper>
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
