"use server";

import { render } from "@react-email/components";

import { EmailTemplates } from "@/types";

import PasswordWasResetEmail from "../../emails/password-was-reset";
import ResetPasswordEmail from "../../emails/reset-password";
import SupportTicketEmail from "../../emails/support-ticket";
import TestEmail from "../../emails/test-email";
import VerifyEmailEmail from "../../emails/verify-email";

const emailComponents = {
  TestEmail: TestEmail,
  VerifyEmail: VerifyEmailEmail,
  ResetPassword: ResetPasswordEmail,
  PasswordWasReset: PasswordWasResetEmail,
  SupportTicket: SupportTicketEmail,
};

type EmailRendererProps = {
  template?: EmailTemplates;
  data: {};
};

export const emailRenderer = async ({
  template,
  data = {},
}: EmailRendererProps) => {
  const EmailComponents =
    emailComponents[template as keyof typeof emailComponents];
  return render(<EmailComponents data={data} />);
};
