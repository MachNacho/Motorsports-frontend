import { z } from "zod";

export const registerSchema = z.object({
  username: z.string().min(6, "username is too short"),
  email: z.email(),
  password: z
    .string()
    .min(8, "At least 8 characters")
    .regex(/[A-Z]/, "Must contain an uppercase letter")
    .regex(/[0-9]/, "Must contain a number")
    .regex(/[^a-zA-Z0-9]/, "Must contain a special character"),
  firstname: z.string().min(1, "first name is needed"),
  lastname: z.string().min(1, "first name is needed"),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
