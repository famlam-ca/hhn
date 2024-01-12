"use client";

import { useMediaQuery } from "usehooks-ts";

import { Skeleton } from "@/components/ui/skeleton";
import { UserAvatar, UserAvatarSkeleton } from "@/components/user-avatar";

interface HeaderProps {
  username: string;
  email: string;
  image: string;
  role: string;
}

export const Header = ({ username, email, image, role }: HeaderProps) => {
  const matches = useMediaQuery("(max-width: 1024px)");

  return (
    <div className="item-start flex flex-col justify-between gap-y-4 lg:flex-row lg:gap-y-0">
      <div className="flex items-center gap-x-3">
        <UserAvatar
          username={username}
          image={image}
          size={matches ? "profile" : "profileLg"}
        />
        <div className="space-y-1">
          <div className="flex items-center gap-x-2">
            <h2 className="text-lg font-semibold lg:text-4xl">{username}</h2>
          </div>
          <h3 className="text-xs font-semibold text-muted-foreground lg:text-sm">
            {email}
          </h3>
          <p className="text-xs font-semibold capitalize text-muted-foreground lg:text-sm">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

export const HeaderSkeleton = () => {
  const matches = useMediaQuery("(max-width: 1024px)");

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:gap-y-0">
        <div className="flex items-center gap-x-2">
          <UserAvatarSkeleton size={matches ? "profile" : "profileLg"} />
          <div className="space-y-2">
            <Skeleton className="h-10 w-48" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-20" />
          </div>
        </div>
      </div>
    </>
  );
};
