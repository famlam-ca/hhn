import { TerminalIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Terminal } from "./terminal";

export const Console = () => {
  const sshConfig = {
    host: "192.168.0.33",
    port: 22,
    username: "root",
    password: "Server22523",
  };

  return (
    <Card className="h-[35rem] border border-border">
      <CardHeader>
        <div className="flex items-center gap-x-2">
          <TerminalIcon className="h-5 w-5" />
          Terminal
        </div>
      </CardHeader>
      <CardContent className="h-[calc(100%-4.5rem)]">
        <div className="h-full border border-border">
          <Terminal sshConfig={sshConfig} />
        </div>
      </CardContent>
    </Card>
  );
};
