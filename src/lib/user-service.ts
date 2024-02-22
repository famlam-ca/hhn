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

  return dbUser;
};

export const getUserById = async (id: string) => {
  const dbUser = await db.user.findUnique({
    where: { id },
  });

  return dbUser;
};
