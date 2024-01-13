import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface BioProps {
  bio: string | null;
}

export const Bio = ({ bio }: BioProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          About <menu></menu>
        </CardTitle>
      </CardHeader>

      <CardContent>
        {/* Bio */}
        <div className="space-y-2">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex h-px items-center justify-center text-xs">
              <span className="bg-background px-2 text-muted-foreground">
                Bio
              </span>
            </div>
          </div>
          <p className="text-sm">
            {bio || "This user prefers to keep an air of mystery about them."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export const BioSkeleton = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <Skeleton className="h-8 w-52" />
        </CardTitle>
      </CardHeader>

      <CardContent>
        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
        </div>
      </CardContent>
    </Card>
  );
};
