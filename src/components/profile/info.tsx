"use client";

import { Pencil } from "lucide-react";

import { InfoModal } from "./info-modal";

interface InfoProps {
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  identity: string;
  image: string;
}

export const Info = ({
  userId,
  username,
  firstName,
  lastName,
  email,
  identity,
  image,
}: InfoProps) => {
  const ownerAsUser = `owner-${userId}`;
  const isOwner = identity === ownerAsUser;

  if (!isOwner) return null;

  return (
    <div className="rounded-xl bg-background">
      <div className="flex items-center gap-x-2.5">
        <div className="h-auto w-auto rounded-md bg-primary p-2 text-white">
          <Pencil className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-sm font-semibold lg:text-lg">Edit your info</h2>
          {/* TODO: Change text */}
          <p className="text-sm text-muted-foreground lg:text-sm">
            Maximize your visibility
          </p>
        </div>
        <InfoModal
          initialUsername={username}
          initialFirstName={firstName}
          initialLastName={lastName}
          initialEmail={email}
          initialImage={image}
        />
      </div>
    </div>
  );
};
