import { BioModal } from "./bio-modal";

interface BioProps {
  username: string;
  userId: string;
  identity: string;
  bio: string | null;
}

export const Bio = ({ username, userId, identity, bio }: BioProps) => {
  const ownerAsUser = `owner-${userId}`;
  const isOwner = identity === ownerAsUser;

  return (
    <div className="space-y-2">
      <div className="group items-center justify-between">
        <div className="flex items-center gap-x-2 text-lg font-semibold lg:text-2xl">
          About <span>{username}</span>
          {isOwner && <BioModal initialValue={bio} />}
        </div>
      </div>
      <p className="text-sm">
        {bio || "This user prefers to keep an air of mystery about them."}
      </p>
    </div>
  );
};
