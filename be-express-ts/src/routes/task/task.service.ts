import { Task } from "@/generated/prisma/client.js";
import { TaskRepository } from "./task.repository.js";
import { CreateTaskDTO } from "./task.dto.js";

export class TaskService {
  private taskRepository: TaskRepository;

  constructor(taskRepository: TaskRepository) {
    this.taskRepository = taskRepository;
  }

  async getAllTask() {
    return await this.taskRepository.getAllTask();
  }

  async getMyTask(userId: string, filters?: { completed?: string }) {
    return await this.taskRepository.getMyTask(userId, filters);
  }

  async getTaskById(id: number) {
    return await this.taskRepository.getTaskById(id);
  }

  async createTask(body: CreateTaskDTO & { userId: string }) {
    return await this.taskRepository.createTask(body);
  }

  async deleteTask(id: number) {
    return await this.taskRepository.deleteTask(id);
  }

  async updateTask(id: number, data: Task & { userId: string }) {
    return await this.taskRepository.updateTask(id, data);
  }
}
