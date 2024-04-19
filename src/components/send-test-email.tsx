"use client";

import { Button } from "@/components/ui/button";
import { sendTestEmail } from "@/lib/services/email-service";
import { EmailTemplates } from "@/types";

export const SendTestEmail = ({
  to,
  subject,
  template,
  data,
}: {
  to: string;
  subject: string;
  template?: EmailTemplates;
  data: {};
}) => {
  return (
    <Button
      onClick={async () => {
        await sendTestEmail({ to, subject, template, data });
      }}
    >
      Send Test Email
    </Button>
  );
};
