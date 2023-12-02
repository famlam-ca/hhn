import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";

import { privateProcedure, publicProcedure, router } from "./trpc";
import { db } from "@/db";

export const appRouter = router({
  createUser: publicProcedure.query(async (req: any) => {
    const body = await req.json();
    const { first_name, last_name, email, password } = body.data;

    if (!first_name || !last_name || !email || !password)
      throw new TRPCError({ code: "UNAUTHORIZED" });

    // check if the user is in the database
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
  updateUser: privateProcedure
    .input(
      z.object({
        name: z.string().optional(),
        first_name: z.string().optional(),
        last_name: z.string().optional(),
        email: z.string().email().optional(),
      }),
    )
    .query(async ({ ctx, input }) => {
      const dbUser = await db.file.findFirst({
        where: {
          userId: ctx.userId,
        },
      });

      if (!dbUser) throw new TRPCError({ code: "UNAUTHORIZED" });

      const updatedUser = db.user.update({
        where: {
          id: ctx.userId,
        },
        data: {
          ...input,
        },
      });

      return updatedUser;
    }),
});

export type AppRouter = typeof appRouter;
