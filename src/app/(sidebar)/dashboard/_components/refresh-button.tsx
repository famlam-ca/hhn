"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

export const RefreshButton = () => {
  const router = useRouter();

  const refresh = () => {
    router.refresh();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refresh();
    }, 30000); // 30 sec = 30000 // 5 min = 300000

    return () => clearInterval(intervalId);
  });

  return (
    <Hint label="Refresh" asChild>
      <Button onClick={refresh} variant="secondary" size="sm">
        <RefreshCw className="h-5 w-5" />
      </Button>
    </Hint>
  );
};
