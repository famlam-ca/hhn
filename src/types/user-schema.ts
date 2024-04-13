import { z } from "zod";

export const EditProfileSchema = z.object({
  display_name: z
    .string()
    .refine(
      (v) => /.{8,}/.test(v),
      "Display name must be at least 8 characters long.",
    )
    .refine(
      (v) => /^[a-zA-Z0-9_.]+$/i.test(v),
      "Display Name must contain only letters, numbers, underscores, and periods.",
    )
    .refine(
      (v) => /^.{1,20}$/.test(v),
      "Display name must be at most 20 characters long.",
    )
    .refine(
      (v) => /^(?!.*[_.]{2,})[^._].*[^._]$/.test(v),
      "Display name cannot contain consecutive, leadning or trailing underscores or periods.",
    ),
  email: z
    .string()
    .email()
    .refine(
      (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(v),
      "Must be a valid email address.",
    ),
  bio: z
    .string()
    .refine((v) =>
      /^.{0,200}$/.test("Bio must be at most 200 characters long."),
    ),
  image: z
    .string()
    .url()
    .refine(
      (v) =>
        /^https:\/\/(utfs.io\/f\/[^\/]+\.png|www.famlam.ca\/logo\/[^\/]+\.png)$/.test(
          v,
        ),
      "Invalid image URL.",
    ),
});

export const EditAccountSchema = z
  .object({
    first_name: z
      .string()
      .refine(
        (v) => /^[A-Za-z0-9]*$/i.test(v),
        "First name may only contain letters.",
      )
      .optional(),
    last_name: z
      .string()
      .refine(
        (v) => /^[A-Za-z0-9]*$/i.test(v),
        "Last name may only contain letters.",
      )
      .optional(),
    oldPassword: z
      .string()
      .optional()
      .refine(
        (v) => v === undefined || v === "" || v.length >= 8,
        "Password must be at least 8 characters long.",
      ),
    newPassword: z
      .string()
      .optional()
      .refine(
        (v) => v === undefined || v === "" || v.length >= 8,
        "Password must be at least 8 characters long.",
      )
      .refine(
        (v) =>
          v === undefined ||
          v === "" ||
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/.test(v),
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character.",
      ),
    logoutFromOtherDevices: z.boolean().optional(),
    role: z.enum(["user", "superuser", "admin"]).optional(),
  })
  .refine(
    (data) =>
      !(data.oldPassword && data.newPassword) ||
      data.newPassword !== data.oldPassword,
    {
      message: "New Passwords cannot be the same as Old Password.",
      path: ["newPassword"],
    },
  )
  .refine((data) => !(data.oldPassword && !data.newPassword), {
    message: "New password is required to change your password.",
    path: ["newPassword"],
  });

export const ResetPasswordSchemaStep1 = z.object({
  email: z
    .string()
    .email()
    .refine(
      (v) => /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(v),
      "Must be a valid email address",
    ),
});

export const ResetPasswordSchemaStep2 = z
  .object({
    code: z.string().length(6),
    logoutFromOtherDevices: z.boolean().default(true),
    newPassword: z
      .string()
      .refine(
        (v) => /.{8,}/.test(v),
        "Password must be at least 8 characters long",
      )
      .refine(
        (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/.test(v),
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
    newPasswordConfirm: z
      .string()
      .refine(
        (v) => /.{8,}/.test(v),
        "Password must be at least 8 characters long",
      )
      .refine(
        (v) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/.test(v),
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character",
      ),
  })
  .refine((data) => data.newPassword === data.newPasswordConfirm, {
    message: "Passwords do not match.",
    path: ["passwordConfirm"],
  });
