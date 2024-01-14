import { Button } from "@/components/ui/button";
import Link from "next/link";

interface PageProps {
  params: {
    username: string;
  };
}

const Page = ({ params }: PageProps) => {
  return (
    <div className="h-[calc(100vh-3rem)]">
      <div className="flex h-full flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          OO<span className="text-primary">PS!</span>
        </h1>
        <p className="text-lg font-semibold">
          Looks like you forgot to append /edit
        </p>
        <p className="text-sm text-muted-foreground">
          Example: www.famlam.ca/admin/{params.username}/edit
        </p>
        <Button variant="secondary" asChild>
          <Link href={`/admin/${params.username}/edit`}>Fix it for me</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
