import { z } from "zod";

export const SupportFormSchema = z.object({
  username: z.string().optional(),
  name: z.string().optional(),
  email: z.string().email(),
  subject: z.string(),
  message: z.string(),
});
