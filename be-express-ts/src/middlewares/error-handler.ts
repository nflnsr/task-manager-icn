import { HttpException } from "@/utils/http-exeption";
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { responseHandler } from "@/utils/response-handler";
import {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientValidationError,
} from "@/generated/prisma/internal/prismaNamespace";
import { PrismaError, prismaHttpStatus, prismaKnownErrorMsg } from "@/libs/prisma";

const errorHandler: ErrorRequestHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  console.log("Error caught by middleware:", err as PrismaClientKnownRequestError);
  if (!err) return next();
  if (err instanceof HttpException) {
    return responseHandler.optional({
      res,
      category: err.errorCategory,
      code: err.errorCode,
      message: err.message,
    });
  } else if (err instanceof PrismaClientKnownRequestError) {
    const formatter = prismaKnownErrorMsg[err.code];
    const message = formatter ? formatter(err as PrismaError) : "Terjadi kesalahan pada database.";
    const status = prismaHttpStatus[err.code] ?? 500;

    return responseHandler.optional({
      res,
      category: status >= 500 ? "server_error" : "client_error",
      code: status,
      message,
    });
  } else if (err instanceof PrismaClientUnknownRequestError) {
    return responseHandler.internalServerError({
      res,
      message: `Terjadi kesalahan yang tidak diketahui pada database: ${err.message}`,
    });
  } else if (err instanceof PrismaClientValidationError) {
    return responseHandler.unprocessableEntity({
      res,
      message: `Validasi data gagal: ${err.message}`,
    });
  } else {
    return responseHandler.internalServerError({
      res,
      message: "Internal Server Error",
    });
  }
};

export default errorHandler;
