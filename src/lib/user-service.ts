"use server";

import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { revalidatePath } from "next/cache";

import { db } from "@/db";

export const getUserByUsername = async (username: string) => {
  if (username === undefined) {
    const randomNum = Math.floor(Math.random() * 10000);
    const user = {
      id: `userId-${randomNum}`,
      display_name: `User-${randomNum}`,
      username: `user-${randomNum}`,
      role: "user",
    };

    return user;
  }

  const dbUser = await db.user.findUnique({
    where: { username },
    select: {
      id: true,
      display_name: true,
      username: true,
      first_name: true,
      last_name: true,
      email: true,
      image: true,
      role: true,
      bio: true,
      theme: true,
    },
  });

  if (!dbUser) {
    throw new Error("No users found");
  }

  return dbUser;
};

export const getUserById = async (id: string) => {
  const dbUser = await db.user.findUnique({
    where: { id },
  });

  if (!dbUser) {
    throw new Error("No users found");
  }

  return dbUser;
};

export const getAllUsers = async () => {
  const dbUser = await db.user.findMany();

  if (!dbUser) {
    throw new Error("No users found");
  }

  return dbUser;
};

export const getUserSocials = async (id: string) => {
  const dbUser = await getUserById(id);

  const dbSocials = await db.socials.findMany({
    where: { userId: dbUser.id },
  });

  return dbSocials;
};

export const updateUser = async (values: Partial<User>) => {
  const user = await getUserById(values.id!);

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
