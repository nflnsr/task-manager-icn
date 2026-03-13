import { z } from "zod";

const createTaskSchema = z.object({
  title: z.string().max(255),
  description: z.string().max(255).optional(),
  completed: z.boolean().default(false),
}).strict();

const updateTaskSchema = z.object({
  title: z.string().max(255).optional(),
  description: z.string().max(255).optional(),
  completed: z.boolean().optional(),
}).strict();

type CreateTaskDTO = z.infer<typeof createTaskSchema>;
type UpdateTaskDTO = z.infer<typeof updateTaskSchema>;

export { createTaskSchema, updateTaskSchema, CreateTaskDTO, UpdateTaskDTO };
