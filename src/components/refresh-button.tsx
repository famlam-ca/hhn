"use client";

import { RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { useRefresh } from "@/hooks/use-refresh";

export const RefreshButton = ({ interval = 30000 }) => {
  const { isDisabled, refresh } = useRefresh(interval);

  const handleClick = () => {
    refresh();
  };

  useEffect(() => {
    const id = setInterval(() => {
      refresh();
    }, interval);

    return () => clearInterval(id);
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
