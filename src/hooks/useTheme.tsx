"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";

import { cn } from "@/lib/utils";

import { Switch } from "@/components/ui/Switch";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Switch
      onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      {theme === "dark" ? (
        <>
          <Sun className="h-4 w-4 text-text-foreground" />
          <Moon className="h-4 w-4" />
        </>
      ) : (
        <>
          <Sun className="h-4 w-4" />
          <Moon className="h-4 w-4 text-text-foreground" />
        </>
      )}
    </Switch>
  );
};

export const ThemeToggle = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <button
      onClick={
        theme === "dark" ? () => setTheme("light") : () => setTheme("dark")
      }
      className={cn("", className)}
    >
      {theme === "dark" ? (
        <div className="flex items-center">
          <Sun className="mr-2 h-5 w-5" />
          Light Mode
        </div>
      ) : (
        <div className="flex items-center">
          <Moon className="mr-2 h-5 w-5" />
          Dark Mode
        </div>
      )}
    </button>
  );
};
