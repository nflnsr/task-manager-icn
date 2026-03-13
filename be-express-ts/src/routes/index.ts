import { Router } from "express";
import user from "./user";
import task from "./task";

const router = Router();

router.use("/users", user)
router.use("/tasks", task);

export default router;