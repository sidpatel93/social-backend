import HTTP_STATUS from "http-status-codes";

export interface IError {
  message: string;
  StatusCode: number;
  status: string;
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  serializedErrors(): IError;
}

export abstract class CustomError extends Error {
  abstract statusCode: number;
  abstract status: string;

  constructor(message: string) {
    super(message);
  }

  serializedErrors(): IError {
    return {
      message: this.message,
      status: this.status,
      StatusCode: this.statusCode,
    };
  }
}

export class JoiValidationError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = "Bad Request";
  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends CustomError {
  statusCode = HTTP_STATUS.BAD_REQUEST;
  status = "Bad Request";
  constructor(message: string) {
    super(message);
  }
}

export class NotFoundError extends CustomError {
  statusCode = HTTP_STATUS.NOT_FOUND;
  status = "Not Found";
  constructor(message: string) {
    super(message);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = HTTP_STATUS.UNAUTHORIZED;
  status = "Not Authorized";
  constructor(message: string) {
    super(message);
  }
}

export class InternalServerError extends CustomError {
  statusCode = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  status = "Internal Server Error";
  constructor(message: string) {
    super(message);
  }
}
