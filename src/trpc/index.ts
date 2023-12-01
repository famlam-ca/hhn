import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";

import { privateProcedure, publicProcedure, router } from "./trpc";
import { db } from "@/db";

export const appRouter = router({
  authCallback: publicProcedure.query(async (req: any) => {
    const body = await req.json();
    const { first_name, last_name, email, password } = body.data;

    if (!first_name || !last_name || !email || !password)
      throw new TRPCError({ code: "UNAUTHORIZED" });

    // check is user is in the database
    const dbUser = await db.user.findFirst({
      where: {
        email: email,
      },
    });

    const hashedPassword = await hash(password, 12);

    if (!dbUser) {
      await db.user.create({
        data: {
          first_name,
          last_name,
          email,
          password: hashedPassword,
        },
      });
    }
    return { success: true };
  }),
});

export type AppRouter = typeof appRouter;
