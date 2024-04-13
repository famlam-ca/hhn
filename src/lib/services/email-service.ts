"use server";

import jwt from "jsonwebtoken";
import { generateId } from "lucia";
import { z } from "zod";

import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { getUser } from "@/lib/services/user-service";
import { ResetPasswordSchemaStep1 } from "@/types/user-schema";

export const sendTestEmail = async (email: string) => {
  const url = `${process.env.NEXT_URL}/api/verify-email?email=${email}`;

  await sendEmail({
    to: email,
    subject: "Test Email",
    body: `<a href="${url}">Test Email</a>`,
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

    await sendEmail({
      to: email,
      subject: "Verify Email",
      body: `<a href="${url}">Verify Email</a>`,
    });

    return {
      success: `Verification email send to ${email}!`,
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
        error: "Account not found",
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

    const existingCode = await db.emailVerification.findFirst({
      where: {
        userId: user.id,
      },
    });

    const code = Math.random().toString().substring(2, 8);

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

    await sendEmail({
      to: email,
      subject: "Verify Email",
      body: `<a href="${url}">Verify Email</a>`,
    });

    return {
      success: `Verification email send to ${email}!`,
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

  await sendEmail({
    to: values.email,
    subject: "Reset Password",
    body: `<a href="${url}">Reset Password</a>`,
  });

  return {
    success: true,
    message: "Password reset email sent.",
    description: "Please check your email to reset your password.",
  };
};
