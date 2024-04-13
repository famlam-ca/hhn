"use client";

import { Button } from "@/components/ui/button";
import { sendTestEmail } from "@/lib/services/email-service";

export const SendTestEmail = ({ email }: { email: string }) => {
  return (
    <Button
      onClick={async () => {
        await sendTestEmail(email);
      }}
    >
      Send Email
    </Button>
  );
};
