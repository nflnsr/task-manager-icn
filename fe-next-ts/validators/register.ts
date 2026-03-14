import { z } from "zod";

export const registerSchema = z
  .object({
    name: z.string().min(3, "minimal 3 karakter"),
    email: z.string().email("alamat email invalid"),
    password: z.string().min(8, "password minimal 8 karakter"),
  });

export type RegisterFormType = z.infer<typeof registerSchema>;
