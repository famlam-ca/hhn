import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { generateId } from "lucia";

const prisma = new PrismaClient();

export const main = async () => {
  const password = await hash("testUser1!", 12);
  await prisma.user.create({
    data: {
      id: generateId(15),
      display_name: "TestUser",
      username: "testuser",
      first_name: "Test",
      last_name: "User",
      email: "test@famlam.ca",
      isEmailVerified: true,
      password,
    },
  });
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
