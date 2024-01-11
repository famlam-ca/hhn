import { Skeleton } from "@/components/ui/skeleton";

interface BioProps {
  username: string;
  bio: string | null;
}

export const Bio = ({ username, bio }: BioProps) => {
  return (
    <div className="space-y-2">
      <div className="group items-center justify-between">
        <div className="flex items-center gap-x-2 text-lg font-semibold lg:text-2xl">
          About <span>{username}</span>
        </div>
      </div>
      <p className="text-sm">
        {bio || "This user prefers to keep an air of mystery about them."}
      </p>
    </div>
  );
};

export const BioSkeleton = () => {
  return (
    <>
      <div className="flex flex-col items-start justify-between gap-y-4 lg:flex-row lg:gap-y-0">
        <div className="flex items-center gap-x-2">
          <div className="space-y-2">
            <Skeleton className="h-7 w-52" />
            <Skeleton className="h-4 w-96" />
            <Skeleton className="h-4 w-96" />
            <Skeleton className="h-4 w-96" />
          </div>
        </div>
      </div>
    </>
  );
};
