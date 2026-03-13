import { Router, Request, Response } from "express";
import { UserRepository } from "./user.repository.js";
import { UserService } from "./user.service.js";
import { UserController } from "./user.controller.js";
import { validate } from "@/middlewares/validate.js";
import { createUserSchema, loginSchema, updateUserSchema } from "./user.dto.js";

const router = Router();

const repository = new UserRepository();
const service = new UserService(repository);
const controller = new UserController(service);

router.get("/", (req, res) => controller.getAllUser(req, res));

router.get("/:id", (req: Request, res: Response) => controller.getUserById(req, res));

router.get("/:id/tasks", (req: Request, res: Response) => controller.getTasksByUserId(req, res));

router.post("/", validate(createUserSchema), (req: Request, res: Response) =>
  controller.createUser(req, res),
);

router.delete("/:id", (req: Request, res: Response) => controller.deleteUser(req, res));

router.put("/:id", validate(updateUserSchema), (req: Request, res: Response) =>
  controller.updateUser(req, res),
);

router.post("/login", validate(loginSchema), (req: Request, res: Response) =>
  controller.login(req, res),
);

router.post("/refresh-token", (req: Request, res: Response) => controller.refreshToken(req, res));

export default router;
