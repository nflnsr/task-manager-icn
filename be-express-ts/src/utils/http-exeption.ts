import { ResponseCategory } from "./response-handler.js";

class HttpException extends Error {
  errorCode: number;
  errorCategory: Extract<ResponseCategory, "client_error" | "server_error">;
  constructor(
    errorCode: number,
    errorCategory: Extract<ResponseCategory, "client_error" | "server_error">,
    public readonly message: string,
  ) {
    super(message);
    this.errorCode = errorCode;
    this.errorCategory = errorCategory;
  }
}

export { HttpException };
