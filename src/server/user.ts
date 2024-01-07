"use server";

import { revalidatePath } from "next/cache";
import { User } from "@prisma/client";

import { getSelf } from "@/lib/auth-service";
import { db } from "@/db";

export const updateUser = async (values: Partial<User>) => {
  const self = await getSelf();

  const validData = {
    username: values.username,
    first_name: values.first_name,
    last_name: values.last_name,
    // email: values.email,
    // password: values.password, // TODO: hash password

    image: values.image,
    // role: values.role,
    bio: values.bio,
  };

  const user = await db.user.update({
    where: { id: self.id },
    data: { ...validData },
  });

  revalidatePath(`/account/${self.username}`);
  revalidatePath(`/${self.username}`);

  return user;
};
