"use client";

import { RefreshCw } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { Button } from "@/components/ui/button";

const DashboardErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
  const router = useRouter();

  useEffect(() => {
    console.log(error);
  });

  return (
    <div className="flex h-screen flex-col items-center justify-center space-y-4">
      <div className="space-y-4 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
          OO<span className="text-primary">PS!</span> :(
        </h1>
        <p className="text-lg font-semibold">
          Error: <span className="text-alert">{error.message}</span>
        </p>
        <p className="text-lg text-muted-foreground">
          Looks like something went wrong. If this error persists please contact{" "}
          <Link
            href="/contact"
            className="underline underline-offset-2 hover:text-primary"
          >
            support
          </Link>
          .
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button onClick={() => router.back()} variant="secondary">
            Go back
          </Button>
          <Button
            onClick={
              // Attempt to recover by trying to re-render the segment
              () => reset()
            }
            variant="secondary"
          >
            <RefreshCw className="mr-2 h-5 w-5" />
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DashboardErrorPage;
