import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";

import { privateProcedure, publicProcedure, router } from "./trpc";
import { db } from "@/db";

export const appRouter = router({
  createUser: publicProcedure
    .input(
      z.object({
        first_name: z.string().min(2),
        last_name: z.string().min(2),
        email: z.string().email().min(3),
        password: z.string().min(10),
      }),
    )
    .mutation(async (opts) => {
      const { first_name, last_name, email, password } = opts.input;

      const dbUser = await db.user.findFirst({
        where: {
          email: opts.input.email,
        },
      });

      if (dbUser) throw new TRPCError({ code: "UNAUTHORIZED" });

      const hashedPassword = await hash(password, 12);

      await db.user.create({
        data: {
          first_name,
          last_name,
          email,
          password: hashedPassword,
        },
      });

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
