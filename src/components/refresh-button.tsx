"use client";

import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Hint } from "@/components/hint";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

export const RefreshButton = () => {
  const router = useRouter();

  const [isDisabled, setIsDisabled] = useState(false);

  const refresh = () => {
    setIsDisabled(true);
    router.refresh();
    setTimeout(() => setIsDisabled(false), 3000); // 3 sec = 3000
  };

  const handleClick = () => {
    toast({
      title: "Refreshed data...",
      duration: 1000,
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
