"use client";

import { RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRefresh } from "@/hooks/use-refresh";

export const RefreshButton = () => {
  const { isDisabled, refresh } = useRefresh();

  const handleClick = () => {
    toast({
      title: "Refreshed data...",
      duration: 2000,
    });
    refresh();
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      refresh();
    }, 30000); // 30 sec = 30000 // 5 min = 300000

    return () => clearInterval(intervalId);
  });

  return (
    <Hint label="Refresh" asChild>
      <Button
        disabled={isDisabled}
        onClick={handleClick}
        variant="outline"
        size="sm"
      >
        <RefreshCw className="h-5 w-5" />
      </Button>
    </Hint>
  );
};
