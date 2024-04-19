"use server";

import { render } from "@react-email/components";
import levenshtein from "fast-levenshtein";
import jwt from "jsonwebtoken";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { z } from "zod";

import { db } from "@/lib/db";
import { transporter } from "@/lib/email-transporter";
import { getUser } from "@/lib/services/user-service";
import { EmailTemplates } from "@/types";
import { SupportFormSchema } from "@/types/support-form-schema";
import { ResetPasswordSchemaStep1 } from "@/types/user-schema";

import TestEmail from "../../../emails/test-email";
import VerifyEmailEmail from "../../../emails/verify-email";
import ResetPasswordEmail from "../../../emails/reset-password";
import PasswordWasResetEmail from "../../../emails/password-was-reset";
import SupportTicketEmail from "../../../emails/support-ticket";
import { emailRenderer } from "@/components/email-renderer";

type SendEmailType = {
  to: string;
  subject: string;
  template?: EmailTemplates;
  data: {};
};

export const sendEmail = async ({
  to,
  subject,
  template,
  data,
}: SendEmailType) => {
  const body = await emailRenderer({ template, data });
  if (!body) {
    return {
      success: false,
      message: "Invalid email template",
    };
  }

  transporter.sendMail({
    from: `"Humble Home Network" <${process.env.EMAIL_USER}>`,
    to: to ? to : "fglp.cm@gmail.com",
    subject,
    html: body,
  });

  return {
    success: true,
  };
};

export const sendTestEmail = async ({
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
  await sendEmail({
    to: to,
    subject: subject,
    template: template,
    data: data,
  });
};

export const resendVerificationEmail = async (email: string) => {
  try {
    const { user } = await getUser({ email });
    if (!user) {
      return {
        error: "Account not found",
      };
    }

    if (user.isEmailVerified === true) {
      return {
        error: "Email already verified",
      };
    }

    const existingCode = await db.emailVerification.findFirst({
      where: {
        userId: user.id,
      },
    });

    if (!existingCode) {
      return {
        success: false,
        message: "Verification code not found",
      };
    }

    const sentAt = new Date(existingCode.sentAt);
    const isOneMinutePassed = new Date().getTime() - sentAt.getTime() > 60000; // 1 minute

    if (!isOneMinutePassed) {
      return {
        error:
          "Please wait " +
          (60 - Math.floor((new Date().getTime() - sentAt.getTime()) / 1000)) +
          " second(s) before sending another email.",
      };
    }

    const code = Math.random().toString().substring(2, 8);

    await db.emailVerification.update({
      where: {
        id: existingCode.id,
        userId: user.id,
      },
      data: {
        code,
        sentAt: new Date(),
      },
    });

    const token = jwt.sign(
      { email, userId: user.id, code },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5m",
      },
    );

    const url = `${process.env.NEXT_URL}/api/verify-email?token=${token}`;

    const data = {
      url,
      username: user.display_name,
    };

    await sendEmail({
      to: email,
      subject: "Verify Email",
      template: "VerifyEmail",
      data: data,
    });

    await db.session.deleteMany({
      where: { userId: user.id },
    });

    return {
      success: true,
      message: `Verification email send to ${email}!`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const sendNewVerificationEmail = async (email: string) => {
  try {
    const { user } = await getUser({ email });
    if (!user) {
      return {
        success: false,
        message: "Account not found",
      };
    }

    await db.user.update({
      where: {
        id: user.id,
      },
      data: {
        isEmailVerified: false,
      },
    });

    const code = Math.random().toString().substring(2, 8);

    const existingCode = await db.emailVerification.findFirst({
      where: {
        userId: user.id,
      },
    });
    if (!existingCode) {
      try {
        await db.emailVerification.create({
          data: {
            id: generateId(15),
            code,
            userId: user.id,
            sentAt: new Date(),
          },
        });
      } catch (error: any) {
        return {
          success: false,
          message: error.message,
        };
      }
    } else if (existingCode) {
      const sentAt = new Date(existingCode.sentAt);
      const isOneMinutePassed = new Date().getTime() - sentAt.getTime() > 60000; // 1 minute
      if (!isOneMinutePassed) {
        return {
          success: false,
          message:
            "Please wait " +
            (60 -
              Math.floor((new Date().getTime() - sentAt.getTime()) / 1000)) +
            " second(s) before sending another email.",
        };
      }

      await db.emailVerification.update({
        where: {
          id: existingCode.id,
          userId: user.id,
        },
        data: {
          code,
          sentAt: new Date(),
        },
      });
    }

    const token = jwt.sign(
      { email, userId: user.id, code },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5m",
      },
    );

    const url = `${process.env.NEXT_URL}/api/verify-email?token=${token}`;

    const data = {
      url,
      username: user.display_name,
    };

    await sendEmail({
      to: email,
      subject: "Verify Email",
      template: "VerifyEmail",
      data: data,
    });

    return {
      success: true,
      message: `Verification email send to ${email}!`,
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const sendResetPasswordEmail = async (
  values: z.infer<typeof ResetPasswordSchemaStep1>,
) => {
  const { user } = await getUser({ email: values.email });
  if (!user) {
    return {
      success: false,
      message: "No account with that email found.",
    };
  }

  const code = Math.random().toString().substring(2, 8);

  await db.resetPassword.create({
    data: {
      id: generateId(15),
      code,
      userEmail: values.email,
      sentAt: new Date(),
    },
  });

  const token = jwt.sign(
    { email: values.email, code },
    process.env.JWT_SECRET!,
    {
      expiresIn: "5m",
    },
  );

  const url = `${process.env.NEXT_URL}/api/reset-password?token=${token}`;

  const data = {
    url,
    username: user.display_name,
  };

  await sendEmail({
    to: values.email,
    subject: "Reset Password",
    template: "ResetPassword",
    data: data,
  });

  return {
    success: true,
    message: "Password reset email sent.",
    description: "Please check your email to reset your password.",
  };
};

export const sendPasswordWasResetEmail = async (email: string) => {
  const { user } = await getUser({ email });
  if (!user) {
    return {
      success: false,
      message: "No account with that email found.",
    };
  }

  const resetRequest = await db.resetPassword.findFirst({
    where: {
      userEmail: email,
    },
    select: {
      createdAt: true,
    },
  });
  if (!resetRequest) {
    return {
      success: false,
      message: "Not reset password request found",
    };
  }

  await db.resetPassword.deleteMany({
    where: {
      userEmail: email,
    },
  });

  const data = {
    username: user.display_name,
    updatedDate: resetRequest.createdAt,
  };

  await sendEmail({
    to: email,
    subject: "Password was reset",
    template: "PasswordWasReset",
    data: data,
  });
};

export const sendSupportTicketEmail = async (
  values: z.infer<typeof SupportFormSchema>,
) => {
  try {
    try {
      SupportFormSchema.parse(values);
    } catch (error) {
      return {
        success: false,
        message: "Invalid form data",
      };
    }

    const { user } = await getUser({ email: values.email });
    if (!user) {
      return {
        success: false,
        message: "Please use the email associated with your account",
      };
    }

    const existingTickets = await db.supportTicket.findMany({
      where: {
        senderEmail: values.email,
      },
    });
    if (Array.isArray(existingTickets) && existingTickets.length > 0) {
      const sentAt = new Date(existingTickets[0].sentAt);
      if (!isNaN(sentAt.getTime())) {
        const isTenMinutesPassed =
          new Date().getTime() - sentAt.getTime() > 600000; // 10 minutes
        if (!isTenMinutesPassed) {
          return {
            success: false,
            message:
              "Please wait " +
              (10 -
                Math.floor((new Date().getTime() - sentAt.getTime()) / 60000)) +
              " minute(s) before sending another email.",
          };
        }
      }
    }
    for (let ticket of existingTickets) {
      const subjectDistance = levenshtein.get(ticket.subject, values.subject);
      const messageDistance = levenshtein.get(ticket.message, values.message);
      const subjectThreshold = 50;
      const messageThreshold = 100;

      if (
        subjectDistance < subjectThreshold &&
        messageDistance < messageThreshold
      ) {
        return {
          success: false,
          message: "Support ticket already sent",
        };
      }
    }

    try {
      await db.supportTicket.create({
        data: {
          id: generateId(15),
          senderUsername: user.username,
          senderName: values.name,
          senderEmail: values.email,
          subject: values.subject,
          message: values.message,
          sentAt: new Date(),
        },
      });

      await sendEmail({
        to: "fglp.cm@gmail.com",
        subject: values.subject,
        data: {
          username: values.username,
          email: values.email,
          message: values.message,
        },
      });
      await sendEmail({
        to: values.email,
        subject: values.subject,
        template: "SupportTicket",
        data: {
          username: values.username,
          subject: values.subject,
          email: values.email,
          message: values.message,
        },
      });
    } catch (error: any) {
      return {
        success: false,
        message: error.message,
      };
    }

    revalidatePath("/support");

    return {
      success: true,
      message: "Support ticket sent!",
      description: "We will get back to you as soon as possible.",
    };
  } catch (error: any) {
    return {
      success: false,
      messge: error.message,
    };
  }
};
