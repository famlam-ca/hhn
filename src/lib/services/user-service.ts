"use server";

import { user } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { revalidatePath } from "next/cache";

import { validateSession } from "@/lib/lucia";
import { db } from "@/lib/db";

type UserIdentifier =
  | { email: string }
  | { username: string }
  | { userId: string };

export const getUser = async (identifier: UserIdentifier) => {
  const dbUser = await db.user.findUnique({
    where:
      "email" in identifier
        ? { email: identifier.email }
        : "username" in identifier
          ? { username: identifier.username }
          : { id: identifier.userId },
    select:
      "username" in identifier
        ? {
            id: true,
            display_name: true,
            username: true,
            first_name: true,
            last_name: true,
            email: true,
            isEmailVerified: true,
            image: true,
            role: true,
            bio: true,
            theme: true,
          }
        : undefined,
  });

  if (!dbUser) {
    throw new Error("No user found");
  }

  return dbUser;
};

export const getFakeUser = async () => {
  const randomNum = Math.floor(Math.random() * 10000);
  const user = {
    id: `userId-${randomNum}`,
    display_name: `User-${randomNum}`,
    username: `user-${randomNum}`,
    role: "user",
  };

  return user;
};

export const getAllUsers = async () => {
  const dbUser = await db.user.findMany();

  if (!dbUser) {
    throw new Error("No users found");
  }

  return dbUser;
};

// export const getUserSocials = async (id: string) => {
//   const dbUser = await getUser({userId: id});

//   const dbSocials = await db.socials.findMany({
//     where: { userId: dbUser.id },
//   });

//   return dbSocials;
// };

export const updateUser = async (values: Partial<user>) => {
  const user = await getUser({ userId: values.id! });

  if (!user) {
    throw new Error("User not found");
  }

  let hashedPassword = user.password;

  if (values.password) {
    hashedPassword = await hash(values.password, 12);
  }

  const validData = {
    display_name: values.display_name,
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    password: hashedPassword,
    image: values.image,
    role: values.role,
    bio: values.bio,
    theme: values.theme,
  };

  const dbUser = await db.user.update({
    where: { id: user.id },
    data: { ...validData },
  });

  revalidatePath(`/u/${dbUser.username}`);
  revalidatePath(`/${dbUser.username}`);

  return dbUser;
};

export const validatePassword = async (userId: string, password: string) => {
  const dbUser = await db.user.findUnique({
    where: { id: userId },
    select: { password: true },
  });

  const isValid = await compare(password, dbUser?.password!);

  return isValid;
};

export const isEmailVerified = async (email: string) => {
  try {
    const user = await getUser({ email });

    if (!user) {
      return {
        error: "Account not found",
      };
    }

    if (user.isEmailVerified === false) {
      return {
        error: "Email not verified",
        key: "email_not_verified",
      };
    }

    if (user.isEmailVerified === true) {
      return {
        success: "Email is already verified",
      };
    }

    return {
      success: "Email verified",
    };
  } catch (error: any) {
    return {
      error: error?.message,
    };
  }
};

export const getSelf = async (username?: string) => {
  const { user } = await validateSession();
  const self = user;

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const dbUser = await db.user.findUnique({
    where: username ? { username } : { id: self.id },
  });

  if (!dbUser) {
    throw new Error("User not found");
  }

  if (self.username !== dbUser.username) {
    throw new Error("Unauthorized");
  }

  return dbUser;
};
