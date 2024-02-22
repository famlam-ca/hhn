"use server";

import { User } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { revalidatePath } from "next/cache";

import { db } from "@/db";
import { getUserById } from "@/lib/user-service";

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

export const getAllUsers = async () => {
  const dbUser = await db.user.findMany();

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
