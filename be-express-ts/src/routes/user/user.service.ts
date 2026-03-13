import { User } from "@/generated/prisma/client";
import { UserRepository } from "./user.repository";
import { HttpException } from "@/utils/http-exeption";
import { comparePassword, hashPassword } from "@/libs/bcrypt";
import { generateAccessToken, generateRefreshToken } from "@/libs/jwt";
import { CreateUserDTO, LoginDTO } from "./user.dto";

export class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async getAllUser() {
    return await this.userRepository.getAllUser();
  }

  async getUserById(id: string) {
    return await this.userRepository.getUserById(id);
  }

  async createUser(body: CreateUserDTO) {
    const { password, ...userData } = body;
    const hashedPassword = await hashPassword(password);

    return await this.userRepository.createUser({
      ...userData,
      password: hashedPassword,
    });
  }

  async deleteUser(id: string) {
    return await this.userRepository.deleteUser(id);
  }

  async updateUser(id: string, data: User) {
    return await this.userRepository.updateUser(id, data);
  }

  async login(body: LoginDTO) {
    const data = await this.userRepository.login(body.email);

    if (!(await comparePassword(body.password, data?.password as string))) {
      throw new HttpException(401, "client_error", "password atau email tidak valid");
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userData } = data as User;

    const accessToken = generateAccessToken(userData);
    const refreshToken = generateRefreshToken(userData);

    return { ...userData, accessToken, refreshToken };
  }
}
