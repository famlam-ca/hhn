import { validatePassword } from "@/lib/services/user-service";
import { z } from "zod";

export const EditProfileSchema = z.object({
  display_name: z
    .string()
    .refine(
      (v) => /.{8,}/.test(v),
      "Display name must be at least 8 characters long",
    )
    .refine(
      (v) => /^[a-zA-Z0-9_.]+$/i.test(v),
      "Display Name must contain only letters, numbers, underscores, and periods",
    )
    .refine(
      (v) => /^.{1,20}$/.test(v),
      "Display name must be at most 20 characters long",
    )
    .refine(
      (v) => /^(?!.*[_.]{2,})[^._].*[^._]$/.test(v),
      "Display name cannot contain consecutive, leadning or trailing underscores or periods",
    ),
  email: z
    .string()
    .email()
    .refine(
      (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(v),
      "Must be a valid email address",
    ),
  bio: z
    .string()
    .refine((v) =>
      /^.{0,200}$/.test("Bio must be at most 200 characters long"),
    ),
  image: z
    .string()
    .url()
    .refine(
      (v) =>
        /^https:\/\/(utfs.io\/f\/[^\/]+\.png|www.famlam.ca\/logo\/[^\/]+\.png)$/.test(
          v,
        ),
      "Invalid image URL",
    ),
});

// currently unused
export const EditAccountSchema = (userId: string) => {
  return z
    .object({
      first_name: z
        .string()
        .refine(
          (v) => /^[A-Za-z]*$/i.test(v),
          "First Name may only contain letters",
        )
        .optional(),
      last_name: z
        .string()
        .refine(
          (v) => /^[A-Za-z]*$/i.test(v),
          "Last Name may only contain letters",
        )
        .optional(),
      oldPassword: z
        .string()
        .refine(
          async (v) => {
            if (v) {
              const isValid = await validatePassword(userId, v);
              return isValid;
            }
            return true;
          },
          { message: "Old password is incorrect." },
        )
        .optional(),
      newPassword: z
        .string()
        .refine(
          (v) => (v ? /.{8,}/.test(v) : true),
          "Password must be at least 8 characters long",
        )
        .refine(
          (v) =>
            v ? /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/.test(v) : true,
          "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
        )
        .optional(),
      role: z.enum(["user", "superuser", "admin"]).optional(),
    })
    .refine(
      (data) => {
        if (data.oldPassword === data.newPassword && data.oldPassword) {
          return false;
        }
        return true;
      },
      {
        message: "New passwords cannot be the same as old password.",
        path: ["newPassword"],
      },
    )
    .refine(
      (data) => {
        if (data.oldPassword && !data.newPassword) {
          return false;
        }
        return true;
      },
      {
        message: "New password is required to change your password.",
        path: ["newPassword"],
      },
    );
};
