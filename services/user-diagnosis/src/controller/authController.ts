import { RequestHandler } from "express";
import { getGoogleProfileFromToken } from "../lib/helper";
import { AppError } from "../lib/AppError";
import { STATUS_CODE } from "../lib/statusCode";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../lib/config";

const prisma = new PrismaClient();

export const login: RequestHandler = async (request, response, next) => {
  try {
    const { access_token } = request.body;
    if (!access_token) {
      throw new AppError(
        "access_token field not found in the request body",
        STATUS_CODE.BAD_REQUEST
      );
    }

    const googleCredentials = await getGoogleProfileFromToken(access_token);
    if (!googleCredentials) {
      throw new AppError("Invalid access token", STATUS_CODE.UNAUTHORIZED);
    }

    const { email, name: username } = googleCredentials;
    let userData = await prisma.user.findFirst({
      where: {
        username,
        email,
      },
    });

    // Create a new user if it does not exist in the database
    if (!userData) {
      userData = await prisma.user.create({
        data: {
          username,
          email,
        },
      });
    }

    const token = jwt.sign(
      {
        userId: userData?.id,
        username: userData?.id,
        email: userData?.email,
      },
      JWT_SECRET
    );

    response.send({
      status: "success",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};
