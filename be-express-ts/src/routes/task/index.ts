import { Router, Request, Response } from "express";
import { TaskRepository } from "./task.repository";
import { TaskService } from "./task.service";
import { TaskController } from "./task.controller";
import { validate } from "@/middlewares/validate";
import { createTaskSchema, updateTaskSchema } from "./task.dto";
import { authenticate } from "@/middlewares/authenticate";

const router = Router();

const repository = new TaskRepository();
const service = new TaskService(repository);
const controller = new TaskController(service);

router.get("/", (req: Request, res: Response) => controller.getAllTask(req, res));

router.get("/my-tasks", authenticate, (req: Request, res: Response) =>
  controller.getMyTask(req, res),
);

router.get("/:id", (req: Request, res: Response) => controller.getTaskById(req, res));

router.post("/", authenticate, validate(createTaskSchema), (req: Request, res: Response) =>
  controller.createTask(req, res),
);

router.delete("/:id", authenticate, (req: Request, res: Response) =>
  controller.deleteTask(req, res),
);

router.put("/:id", authenticate, validate(updateTaskSchema), (req: Request, res: Response) =>
  controller.updateTask(req, res),
);

export default router;
