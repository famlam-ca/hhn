import { getServerSession } from "next-auth";

import { authOptions } from "./auth-options";
import { db } from "@/db";

export const getSelf = async () => {
  const session = await getServerSession(authOptions);
  const self = session?.user!;

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const dbUser = await db.user.findUnique({
    where: {
      id: self.id,
    },
  });

  if (!dbUser) {
    throw new Error("Not found");
  }

  return dbUser;
};

export const getSelfByUsername = async (username: string) => {
  const session = await getServerSession(authOptions);
  const self = session?.user!;

  if (!self || !self.username) {
    throw new Error("Unauthorized");
  }

  const dbUser = await db.user.findUnique({
    where: { username },
  });

  if (!dbUser) {
    throw new Error("User not found");
  }

  if (self.username !== dbUser.username) {
    throw new Error("Unauthorized");
  }

  return dbUser;
};
