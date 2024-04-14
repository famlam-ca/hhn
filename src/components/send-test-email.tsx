"use client";

import { Button } from "@/components/ui/button";
import { sendTestEmail } from "@/lib/services/email-service";
import { EmailTemplates } from "@/types";

export const SendTestEmail = ({
  email,
  subject,
  template,
  data,
}: {
  email: string;
  subject: string;
  template?: EmailTemplates;
  data: {};
}) => {
  return (
    <Button
      onClick={async () => {
        await sendTestEmail({ email, subject, template, data });
      }}
    >
      Send Email
    </Button>
  );
};
