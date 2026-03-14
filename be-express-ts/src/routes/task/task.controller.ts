import { Request, Response } from "express";
import { TaskService } from "./task.service.js";
import { responseHandler } from "@/utils/response-handler.js";

export class TaskController {
  private taskService: TaskService;

  constructor(taskService: TaskService) {
    this.taskService = taskService;
  }

  async getAllTask(req: Request, res: Response) {
    const data = await this.taskService.getAllTask();

    return responseHandler.success({ res, data: data });
  }

  async getMyTask(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const query = req.query;
    const filters = {
      completed: query?.completed as string | undefined,
    };
    const data = await this.taskService.getMyTask(userId, filters);

    return responseHandler.success({ res, data: data });
  }

  async getTaskById(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const data = await this.taskService.getTaskById(id);

    return responseHandler.success({ res, data: data });
  }

  async createTask(req: Request, res: Response) {
    const userId = req.user?.id as string;
    const body = req.body;
    const result = await this.taskService.createTask({ ...body, userId });

    return responseHandler.created({ res, data: result });
  }

  async deleteTask(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    await this.taskService.deleteTask(id);

    return responseHandler.noContent({ res });
  }

  async updateTask(req: Request, res: Response) {
    const id = parseInt(req.params.id as string);
    const body = req.body;
    const userId = req.user?.id as string;
    const data = await this.taskService.updateTask(id, { ...body, userId });

    return responseHandler.success({ res, data: data });
  }
}
