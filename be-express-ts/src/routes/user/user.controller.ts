import { Request, Response } from "express";
import { UserService } from "./user.service.js";
import { responseHandler } from "@/utils/response-handler.js";

export class UserController {
  private userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async getAllUser(req: Request, res: Response) {
    const data = await this.userService.getAllUser();

    return responseHandler.success({ res, data: data });
  }

  async getUserById(req: Request, res: Response) {
    const params = req.params;
    const data = await this.userService.getUserById(params.id as string);

    return responseHandler.success({ res, data: data });
  }

  async getTasksByUserId(req: Request, res: Response) {
    const params = req.params;
    const data = await this.userService.getTasksByUserId(params.id as string);

    return responseHandler.success({ res, data: data });
  }

  async createUser(req: Request, res: Response) {
    const body = req.body;
    const result = await this.userService.createUser(body);

    return responseHandler.created({ res, data: result });
  }

  async deleteUser(req: Request, res: Response) {
    const id = req.params.id as string;
    await this.userService.deleteUser(id);

    return responseHandler.noContent({ res });
  }

  async updateUser(req: Request, res: Response) {
    const params = req.params;
    const body = req.body;
    const data = await this.userService.updateUser(params.id as string, body);

    return responseHandler.success({ res, data: data });
  }

  async login(req: Request, res: Response) {
    const body = req.body;
    const data = await this.userService.login(body)

    res.cookie("refreshToken", data.refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      domain: process.env.COOKIE_DOMAIN,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return responseHandler.success({ res, data });
  }

  async refreshToken(req: Request, res: Response) {
    const refreshToken = req.cookies?.refreshToken;
    console.log(req?.cookies);
    const data = await this.userService.refreshToken(refreshToken); 

      res.cookie("refreshToken", data.refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        maxAge: 1000 * 60 * 60 * 24 * 7,
      });

      return responseHandler.success({
        res,
        data: { accessToken: data.accessToken, refreshToken: data.refreshToken },
      });
  }
}
