import { User } from "@/generated/prisma/client.js";
import { prisma } from "@/libs/prisma.js";
import { CreateUserDTO } from "./user.dto.js";

export class UserRepository {
  async getAllUser() {
    return await prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async getUserById(id: string) {
    return await prisma.user.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async createUser(data: CreateUserDTO) {
    return await prisma.user.create({
      data: data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async deleteUser(id: string) {
    return await prisma.user.delete({
      where: {
        id,
      },
    });
  }

  async updateUser(id: string, data: User) {
    return await prisma.user.update({
      where: {
        id,
      },
      data: data,
      select: {
        id: true,
        email: true,
        name: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }

  async login(email: string) {
    return await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        password: true,
        name: true,
      },
    });
  }
}
