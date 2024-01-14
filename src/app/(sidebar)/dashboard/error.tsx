"use client";

import { useEffect } from "react";
import Link from "next/link";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";

const DashboardErrorPage = ({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) => {
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
          Looks like something went wrong. If this error persists please contact
          support.
        </p>
        <div className="flex items-center justify-center gap-2">
          <Button variant="secondary" asChild>
            <Link href="/">Go back home</Link>
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
