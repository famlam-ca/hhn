import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export const main = async () => {
  const password = await hash("testUser!", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@famlam.ca" },
    update: {},
    create: {
      name: "Test",
      email: "test@famlam.ca",
      full_name: "Test User",
      password,
    },
  });
  console.log({ user });
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
