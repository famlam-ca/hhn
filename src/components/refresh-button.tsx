"use client";

import { RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { useRefresh } from "@/hooks/use-refresh";

export const RefreshButton = ({ interval = 30000 }) => {
  const { isDisabled, refresh } = useRefresh(interval);

  const handleClick = () => {
    toast({
      title: "Refreshed data...",
      duration: 2000,
    });
    refresh();
  };

  useEffect(() => {
    const id = setInterval(() => {
      refresh();
    }, interval);

    return () => clearInterval(id);
  });

  return (
    // TODO: Fix the hint label
    <Hint label="Refresh - currently not working" asChild>
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
