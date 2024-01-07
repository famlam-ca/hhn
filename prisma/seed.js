import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export const main = async () => {
  const password = await hash("testUser!", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@famlam.ca" },
    update: {},
    create: {
      username: "Test",
      email: "test@famlam.ca",
      first_name: "Test",
      last_name: "User",
      password,
    },
  });
  console.log({ user }); // debug
};
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e); // debug
    await prisma.$disconnect();
    process.exit(1);
  });
