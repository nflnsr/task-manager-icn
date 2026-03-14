import { z } from "zod";

export const taskSchema = z.object({
  title: z.string().min(3, "minimal 3 karakter"),
  description: z.string().min(3, "minimal 3 karakter"),
  completed: z.boolean().default(false).optional(),
});

export type TaskFormType = z.infer<typeof taskSchema>;
