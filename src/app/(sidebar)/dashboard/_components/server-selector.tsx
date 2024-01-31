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

export const ServerSelector = () => {
  const [label, setLabel] = useState<string>("Containers");

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
      <DropdownMenuContent>
        <DropdownMenuLabel className="text-muted-foreground">
          Server Type
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuItem onClick={() => setLabel("Containers")}>
          <Container className="mr-2 h-4 w-4 text-muted-foreground" />
          Containers
        </DropdownMenuItem>
        <DropdownMenuItem onClick={() => setLabel("Virtual Machines")}>
          <Monitor className="mr-2 h-4 w-4 text-muted-foreground" />
          Virtual Machines
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
