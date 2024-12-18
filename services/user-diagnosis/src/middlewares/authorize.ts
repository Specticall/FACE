import { RequestHandler } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../lib/AppError";
import { STATUS_CODE } from "../lib/statusCode";
import { JWT_SECRET } from "../lib/config";
import { JWTPayload } from "../lib/types";

export const authorize: RequestHandler = async (request, response, next) => {
  try {
    const bearerToken = request.headers.authorization;
    if (!bearerToken) {
      throw new AppError(
        "token was not found in the request header",
        STATUS_CODE.BAD_REQUEST
      );
    }

    const token = bearerToken.split(" ")[1];
    if (!token) {
      throw new AppError(
        "Invalid bearer token format",
        STATUS_CODE.BAD_REQUEST
      );
    }

    const payloadJWT = jwt.verify(token, JWT_SECRET) as JWTPayload;
    if (!payloadJWT) {
      throw new AppError("Failed to verify token", STATUS_CODE.UNAUTHORIZED);
    }

    // Append user data taken from the token into the request body
    request.body = { ...request.body, ...payloadJWT };

    next();
  } catch (error) {
    next(error);
  }
};
