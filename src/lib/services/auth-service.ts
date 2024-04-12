"use server";

import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { lucia, validateSession } from "@/lib/lucia";
import { getUser } from "@/lib/services/user-service";
import { SignInSchema } from "@/types/sign-in";
import { firstStepSchema, secondStepSchema } from "@/types/sign-up";

export const signUp = async (
  values: z.infer<typeof firstStepSchema> & z.infer<typeof secondStepSchema>,
) => {
  const hashedPassword = await hash(values.password, 12);
  const userId = generateId(15);

  try {
    await db.user.create({
      data: {
        id: userId,
        display_name: values.display_name,
        username: values.username,
        first_name: values.first_name,
        last_name: values.last_name,
        email: values.email,
        password: hashedPassword,
      },
    });

    //  generate a random string 6 characters long
    const code = Math.random().toString().substring(2, 8);

    await db.emailVerification.create({
      data: {
        id: generateId(15),
        code,
        userId,
        sentAt: new Date(),
      },
    });

    const token = jwt.sign(
      { email: values.email, userId, code },
      process.env.JWT_SECRET!,
      {
        expiresIn: "5m",
      },
    );

    const url = `${process.env.NEXT_URL}/api/verify-email?token=${token}`;

    await sendEmail({
      to: values.email,
      html: `<a href="${url}">Verify Email</a>`,
      subject: "Verify Email",
    });

    return {
      success: true,
      data: {
        userId,
      },
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    SignInSchema.parse(values);
  } catch (error: any) {
    return {
      error: error.message,
    };
  }

  const user = await getUser({ email: values.email });

  if (!user) {
    return {
      error: "Account not found",
    };
  }

  const isValidPassword = await compare(values.password, user.password);

  if (!isValidPassword) {
    return {
      error: "Invalid email or password.",
    };
  }

  if (user.isEmailVerified === false) {
    return {
      error: "Email not verified",
      key: "email_not_verified",
    };
  }

  try {
    const session = await lucia.createSession(user.id, {
      expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    });

    const sessionCookie = lucia.createSessionCookie(session.id);

    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return {
      success: "Signed in successfully",
    };
  } catch (error: any) {
    console.error("Error creating session: ", error);
    return {
      error: error?.message,
    };
  }
};

export const signOut = async ({ userId }: { userId?: string } = {}) => {
  try {
    let session;

    if (!userId) {
      const res = await validateSession();

      session = res.session;

      const sessionCookie = lucia.createBlankSessionCookie();

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    } else if (userId) {
      session = await db.session.findFirst({
        where: { userId },
      });
    }

    if (!session) {
      return {
        error: "Session not found",
      };
    }

    await lucia.invalidateSession(session.id);

    return {
      success: "Signed out successfully",
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const invalidateAllUserSessions = async (userId: string) => {
  try {
    let session;

    if (userId) {
      session = await db.session.findFirst({
        where: { userId },
      });
    } else if (!userId) {
      const res = await validateSession();

      session = res.session;

      const sessionCookie = lucia.createBlankSessionCookie();

      cookies().set(
        sessionCookie.name,
        sessionCookie.value,
        sessionCookie.attributes,
      );
    }

    if (!session) {
      return {
        error: "No user sessions not found",
      };
    }

    await lucia.invalidateUserSessions(userId);

    revalidatePath("/admin");

    return {
      success: "User sessions cleared successfully!",
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const resendVerificationEmail = async (email: string) => {
  try {
    const user = await getUser({ email });

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
      html: `<a href="${url}">Verify Email</a>`,
      subject: "Verify Email",
    });

    return {
      success: `Verification email send to ${email}!`,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const sendNewVerificationEmail = async (email: string) => {
  try {
    const user = await getUser({ email });

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
          error: error?.message,
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
      html: `<a href="${url}">Verify Email</a>`,
      subject: "Verify Email",
    });

    return {
      success: `Verification email send to ${email}!`,
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};
