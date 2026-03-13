import { Router } from "express";
import user from "./user/index.js";
import task from "./task/index.js";

const router = Router();

router.use("/users", user)
router.use("/tasks", task);

export default router;