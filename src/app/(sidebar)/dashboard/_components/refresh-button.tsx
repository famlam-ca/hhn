"use client";

import { useRouter } from "next/navigation";
import { RefreshCw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Hint } from "@/components/hint";

export const RefreshButton = () => {
  const router = useRouter();

  const refresh = () => {
    router.refresh();
  };

  return (
    <Hint label="Refresh" asChild>
      <Button onClick={refresh} variant="secondary" size="sm">
        <RefreshCw className="h-5 w-5" />
      </Button>
    </Hint>
  );
};
