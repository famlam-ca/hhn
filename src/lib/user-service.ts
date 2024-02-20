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
      bio: true,
      image: true,
      role: true,
      theme: true,
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
