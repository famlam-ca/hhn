import { db } from "@/db";

export const getUserByUsername = async (username: string) => {
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

      createdAt: true,
      updatedAt: true,
    },
  });

  return dbUser;
};

export const getUserById = async (id: string) => {
  const dbUser = await db.user.findUnique({
    where: { id },
  });

  return dbUser;
};
