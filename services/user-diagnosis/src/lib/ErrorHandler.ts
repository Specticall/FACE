import { ErrorRequestHandler } from "express";
import { AppError } from "./AppError";

export const errorHandler: ErrorRequestHandler = async (
  error: AppError | Error,
  request,
  response,
  next
) => {
  if (error instanceof AppError) {
    response.status(error.statusCode).send({
      status: error.status,
      statusCode: error.statusCode,
      message: error.message,
      stack: error.stack,
    });

    return;
  }

  response.status(500).send({
    status: "fail",
    statusCode: 500,
    message: "Something went very wrong!",
    stack: error.stack,
  });
};
