import { z } from "zod";

export const signInSchema = z.object({
  username: z.string().min(1, "username is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type SignInSchemaType = z.infer<typeof signInSchema>;
