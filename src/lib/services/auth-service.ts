"use server";

import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
import { generateId } from "lucia";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { z } from "zod";

import { db } from "@/lib/db";
import { lucia, validateSession } from "@/lib/lucia";
import { sendEmail } from "@/lib/services/email-service";
import { getUser } from "@/lib/services/user-service";
import {
  FirstStepSchema,
  SecondStepSchema,
  SignInSchema,
} from "@/types/auth-schema";

export const signUp = async (
  values: z.infer<typeof FirstStepSchema> & z.infer<typeof SecondStepSchema>,
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

    const data = {
      username: values.username,
      url,
    };

    await sendEmail({
      to: values.email,
      subject: "Verify Email",
      template: "VerifyEmail",
      data: data,
    });

    return {
      success: true,
      message: "Account created successfully!",
      description: "Please check your email to verify your account.",
      data: {
        userId,
      },
    };
  } catch (error: any) {
    return {
      success: false,
      message: error.message,
    };
  }
};

export const signIn = async (values: z.infer<typeof SignInSchema>) => {
  try {
    SignInSchema.parse(values);
  } catch (error: any) {
    return {
      success: false,
      message: "Invalid email or password",
    };
  }

  const { user } = await getUser({ email: values.email });
  if (!user) {
    return {
      success: false,
      message: "Account not found",
    };
  }

  const isValidPassword = await compare(values.password, user.password);

  if (!isValidPassword) {
    return {
      success: false,
      message: "Invalid password.",
    };
  }

  if (user.isEmailVerified === false) {
    return {
      success: false,
      message: "Email not verified",
      key: "email_not_verified",
    };
  }

  try {
    await createUserSession(user.id);

    return {
      success: true,
      message: "Signed in successfully",
    };
  } catch (error: any) {
    return {
      success: false,
      message: "Invalid email or password",
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
      success: false,
      message: error.message,
    };
  }
};

export const createUserSession = async (userId: string) => {
  const session = await lucia.createSession(userId, {
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
      success: false,
      message: error.message,
    };
  }
};
