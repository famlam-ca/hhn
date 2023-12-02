import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";

import { privateProcedure, publicProcedure, router } from "./trpc";
import { db } from "@/db";

export const appRouter = router({
  createUser: publicProcedure.mutation(async (input) => {
    const createUserInput = z.object({
      first_name: z.string(),
      last_name: z.string(),
      email: z.string().email(),
      password: z.string(),
    });

    const { first_name, last_name, email, password } =
      createUserInput.parse(input);

    const hashedPassword = await hash(password, 12);

    const newUser = await db.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
      },
    });

    return newUser;
  }),
});

export type AppRouter = typeof appRouter;
