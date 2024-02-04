"use client";

import { ChevronsUpDown, Container, Monitor } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { serverType } from "@/types/types";

export const ServerSelector = () => {
  const [label, setLabel] = useState<"Containers" | "Virtual Machines">(
    "Containers",
  );
  const [type, setType] = useState<serverType>("lxc");

  const onSelect = (
    newLabel: "Containers" | "Virtual Machines",
    newType: serverType,
  ) => {
    setLabel(newLabel);
    setType(newType);
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
          Server Type: ({type})
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => onSelect("Containers", "lxc")}>
          <Container className="mr-2 h-4 w-4 text-muted-foreground" />
          Containers <span className="ml-1 text-muted-foreground">(lxc)</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => onSelect("Virtual Machines", "qemu")}>
          <Monitor className="mr-2 h-4 w-4 text-muted-foreground" />
          Virtual Machines
          <span className="ml-1 text-muted-foreground">(qemu)</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
