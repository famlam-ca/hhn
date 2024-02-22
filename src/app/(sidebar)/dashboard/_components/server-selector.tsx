"use client";

import { ChevronsUpDown, Container, Monitor } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ServerType } from "@/types/types";

export const ServerSelector = () => {
  const router = useRouter();
  const pathname = usePathname();

  const serverTypeLabels: Record<ServerType, string> = {
    lxc: "Containers",
    qemu: "Virtual Machines",
  };

  const [type, setType] = useState<ServerType>("lxc");
  const label = serverTypeLabels[type];

  useEffect(() => {
    const url = new URL(window.location.href);

    if (pathname === "/dashboard" && !url.searchParams.has("type")) {
      router.push(`${pathname}?type=${type}`);
    }
  }, [pathname, router, type]);

  const onSelect = (selectedType: ServerType) => {
    setType(selectedType);
    router.push(`${pathname}?type=${selectedType}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className="text-2xl font-semibold data-[state=open]:bg-accent"
        >
          <span>{label}</span>
          <ChevronsUpDown className="ml-2 h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        <DropdownMenuLabel className="text-muted-foreground">
          Server Type: ({label})
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onSelect("lxc")}>
          <Container className="mr-2 h-4 w-4 text-muted-foreground" />
          Containers <span className="ml-1 text-muted-foreground">(lxc)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelect("qemu")}>
          <Monitor className="mr-2 h-4 w-4 text-muted-foreground" />
          Virtual Machines
          <span className="ml-1 text-muted-foreground">(qemu)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
