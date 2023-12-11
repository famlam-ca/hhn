import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";

const prisma = new PrismaClient();

export const main = async () => {
  const password = await hash("Pinetree2020!", 12);
  const user = await prisma.user.upsert({
    where: { email: "test@famlam.ca" },
    update: {},
    create: {
      name: "test",
      email: "test@famlam.ca",
      full_name: "test user",
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
