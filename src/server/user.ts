"use server";

import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";
import { hash } from "bcrypt";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/db";

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelf();

  let hashedPassword = self.password;

  if (values.password) {
    hashedPassword = await hash(values.password, 12);
  }

  const validData = {
    username: values.username,
    first_name: values.first_name,
    last_name: values.last_name,
    email: values.email,
    password: hashedPassword,

    image: values.image,
    role: values.role,
    bio: values.bio,
    theme: values.theme,
  };

  const user = await db.user.update({
    where: { id: self.id },
    data: { ...validData },
  });

  revalidatePath(`/u/${self.username}`);
  revalidatePath(`/${self.username}`);

  return user;
};

export const getAllUsers = async () => {
  const user = await db.user.findMany({});

  return user;
};
