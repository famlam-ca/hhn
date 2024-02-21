"use client";

import { ChevronsUpDown, Container, Monitor } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
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
import { ServerType } from "@/types/types";

export const ServerSelector = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = searchParams.get("type");

  const label = params === "qemu" ? "Virtual Machines" : "Containers";

  const [type, setType] = useState<ServerType>("lxc");

  // useEffect(() => {
  //   if (!params) {
  //     router.push(`/dashboard?type=${type}`);
  //   }
  // }, [params, router, type]);

  const onSelect = async (newType: ServerType) => {
    setType(newType);

    // if (!newType) {
    //   router.push("/dashboard");
    // } else {
    //   router.push(`/dashboard?type=${newType}`);
    // }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger disabled asChild>
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
