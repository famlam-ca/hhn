"use server";

import jwt from "jsonwebtoken";
import { generateId } from "lucia";
import { z } from "zod";

import { db } from "@/lib/db";
import { transporter } from "@/lib/email-transporter";
import { getUser } from "@/lib/services/user-service";
import { EmailTemplates } from "@/types";
import { ResetPasswordSchemaStep1 } from "@/types/user-schema";

import { render } from "@react-email/components";

import { PasswordWasResetEmail } from "../../../emails/password-was-reset";
import { ResetPasswordEmail } from "../../../emails/reset-password";
import { TestEmail } from "../../../emails/test-email";
import { VerifyEmailEmail } from "../../../emails/verify-email";

export const sendEmail = async ({
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
  const emailComponents = {
    TestEmail: TestEmail,
    VerifyEmail: VerifyEmailEmail,
    ResetPassword: ResetPasswordEmail,
    PasswordWasReset: PasswordWasResetEmail,
  };

  if (template && emailComponents[template]) {
    const EmailComponents = emailComponents[template];
    const body = render(<EmailComponents data={data} />);

    transporter.sendMail({
      from: `"Humble Home Network" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html: body,
    });

    return {
      success: true,
    };
  } else {
    return {
      success: false,
      message: "Template not found",
    };
  }
};

export const sendTestEmail = async ({
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
  await sendEmail({
    to: email,
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
        error: "Verification code not found",
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
          error:
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
