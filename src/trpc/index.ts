import { PrismaClient } from "@prisma/client";
import { TRPCError } from "@trpc/server";
import { hash } from "bcrypt";
import { z } from "zod";

import { db } from "@/db";

import { privateProcedure, publicProcedure, router } from "./trpc";

const prisma = new PrismaClient();

export const appRouter = router({
  createUser: publicProcedure
    .input(
      z
        .object({
          username: z
            .string({ required_error: "Username is required" })
            .min(3, "Username must be at least 3 characters"),
          first_name: z.string().max(100),
          last_name: z.string().max(100),
          email: z.string({ required_error: "Email is required" }),
          password: z
            .string({ required_error: "Password is required" })
            .min(10, "Password must be at least 10 characters!")
            .max(32, "Password must not be longer than 32 characters!"),
          passwordConfirm: z.string({
            required_error: "Passwords must match!",
          }),
        })
        .refine((data) => data.password === data.passwordConfirm, {
          path: ["passwordConfirm"],
          message: "Passwords do not match!",
        }),
    )
    .mutation(async ({ input }) => {
      try {
        const hashedPassword = await hash(input.password, 12);
        const user = await prisma.user.create({
          data: {
            username: input.username,
            first_name: input.first_name,
            last_name: input.last_name,
            email: input.email,
            password: hashedPassword,
          },
        });

        return {
          status: "success",
          data: {
            user,
          },
        };
      } catch (err: any) {
        if (err.code === "BAD_REQUEST") {
          throw new TRPCError({
            code: "CONFLICT",
            message: "Email already exists",
          });
        }
      }
    }),

  updateUser: privateProcedure
    .input(
      z
        .object({
          username: z
            .string()
            .min(3, "Username must be at least 3 characters")
            .max(100)
            .optional(),
          full_name: z
            .string()
            .min(1, "Full name is required")
            .max(100)
            .optional(),
          email: z
            .string()
            .min(1, "Email address is required")
            .email("Email Address is invalid")
            .optional(),
        })
        .nullish(),
    )
    .mutation(async ({ ctx, input }) => {
      const dbUser = await db.file.findFirst({
        where: {
          userId: ctx.userId,
        },
      });

      if (!dbUser) throw new TRPCError({ code: "BAD_REQUEST" });

      await db.user.update({
        where: {
          id: ctx.userId,
        },
        data: {
          ...input,
        },
      });

      return { success: true };
    }),
});

export type AppRouter = typeof appRouter;
