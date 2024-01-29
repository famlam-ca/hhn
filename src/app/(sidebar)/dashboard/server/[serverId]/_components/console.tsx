import { TerminalIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import Shell from "./shell";

export const Console = () => {
  return (
    <Card className="h-[35rem] border border-border">
      <CardHeader>
        <div className="flex items-center gap-x-2">
          <TerminalIcon className="h-5 w-5" />
          Terminal
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-4.5rem)]">
        <div className="h-full border border-border">{/* <Shell /> */}</div>
      </CardContent>
    </Card>
  );
};
