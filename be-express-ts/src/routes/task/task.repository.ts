import { Task } from "@/generated/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import { CreateTaskDTO } from "./task.dto.js";

export class TaskRepository {
  async getAllTask() {
    return await prisma.task.findMany();
  }

  async getMyTask(userId: string, filters?: { completed?: string }) {
    console.log(filters?.completed, typeof filters?.completed)
    return await prisma.task.findMany({
      where: {
        userId,
        ...(filters?.completed !== undefined && { completed: Boolean(Number(filters.completed)) }),
      },
    });
  }

  async getTaskById(id: number) {
    return await prisma.task.findUnique({
      where: {
        id,
      },
    });
  }

  async createTask(data: CreateTaskDTO & { userId: string }) {
    try {
      return await prisma.task.create({
        data: {
          title: data.title,
          description: data.description,
          userId: data.userId,
        },
        select: {
          id: true,
          title: true,
          description: true,
          completed: true,
          createdAt: true,
          updatedAt: true,
        },
      });
    } catch (error) {
      console.error("Error creating task:", error);
      throw error; // Rethrow the error after logging it
    }
  }

  async deleteTask(id: number) {
    return await prisma.task.delete({
      where: {
        id,
      },
    });
  }

  async updateTask(id: number, data: Task) {
    return await prisma.task.update({
      where: {
        id,
      },
      data: data,
      select: {
        id: true,
        title: true,
        description: true,
        completed: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
