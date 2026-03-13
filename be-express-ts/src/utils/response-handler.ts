import { Response } from "express";

interface Meta {
  page?: number;
  limit?: number;
  total?: number;
}

type ResponseCategory =
  | "informational"
  | "success"
  | "redirection"
  | "client_error"
  | "server_error";

const responseHandler = {
  success<T>({
    res,
    message = "data fetched successfully",
    data,
    meta,
  }: {
    res: Response;
    message?: string;
    data?: T;
    meta?: Meta;
  }) {
    res.status(200).json({ status: "success", message, data, meta });
  },

  created<T>({
    res,
    message = "data created successfully",
    data,
  }: {
    res: Response;
    message?: string;
    data: T;
  }) {
    res.status(201).json({ status: "success", message, data });
  },

  noContent({ res }: { res: Response }) {
    res.status(204).end();
  },

  unauthorized({ res, message = "unauthorized" }: { res: Response; message?: string }) {
    res.status(401).json({ status: "error", message });
  },

  forbidden({ res, message = "forbidden" }: { res: Response; message?: string }) {
    res.status(403).json({ status: "error", message });
  },

  badRequest({ res, message = "bad request" }: { res: Response; message?: string }) {
    res.status(400).json({ status: "error", message });
  },

  notFound({ res, message = "not found" }: { res: Response; message?: string }) {
    res.status(404).json({ status: "error", message });
  },

  conflict({ res, message = "some data already exists" }: { res: Response; message?: string }) {
    res.status(409).json({ status: "error", message });
  },

  unprocessableEntity({
    res,
    message = "unprocessable entity",
  }: {
    res: Response;
    message?: string;
  }) {
    res.status(422).json({ status: "error", message });
  },

  internalServerError({
    res,
    message = "internal server error",
  }: {
    res: Response;
    message?: string;
  }) {
    res.status(500).json({ status: "error", message });
  },

  optional<T>({
    res,
    category,
    code,
    data,
    message,
  }: {
    res: Response;
    category: ResponseCategory;
    code: number;
    data?: T;
    message?: string;
  }) {
    switch (category) {
      case "informational":
      case "redirection":
        res.status(code);
        break;
      case "success":
        res.status(code).json({ status: "success", data });
        break;
      case "client_error":
      case "server_error":
        res.status(code).json({ status: "error", message });
        break;
      default:
        res.status(code);
        break;
    }
  },
};

export { responseHandler, ResponseCategory };