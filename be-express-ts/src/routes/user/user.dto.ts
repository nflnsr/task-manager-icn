import { z } from "zod";

const createUserSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 8 characters long"),
  name: z.string().min(2, "Name must be at least 2 characters long"),
}).strict();

const updateUserSchema = z.object({
    email: z.email("Invalid email address").optional(),
    password: z.string().min(6, "Password must be at least 8 characters long").optional(),
    name: z.string().min(2, "Name must be at least 2 characters long").optional(),
}).strict();

const loginSchema = z.object({
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 8 characters long"),
}).strict();

type CreateUserDTO = z.infer<typeof createUserSchema>;
type LoginDTO = z.infer<typeof loginSchema>;
type UpdateUserDTO = z.infer<typeof updateUserSchema>;

export { createUserSchema, loginSchema, updateUserSchema, CreateUserDTO, UpdateUserDTO, LoginDTO };
