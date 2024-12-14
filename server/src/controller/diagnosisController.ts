import { RequestHandler } from "express";
import OpenAI from "openai";
import { AppError } from "../lib/AppError";
import { STATUS_CODE } from "../lib/statusCode";
import { PrismaClient } from "@prisma/client";
import { DetectionData } from "../lib/types";
import {
  CLOUDINARY_KEY,
  CLOUDINARY_NAME,
  CLOUDINARY_SECRET,
} from "../lib/config";
import { v2 as cloudinary } from "cloudinary";

const prisma = new PrismaClient();

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

cloudinary.config({
  cloud_name: CLOUDINARY_NAME,
  api_key: CLOUDINARY_KEY,
  api_secret: CLOUDINARY_SECRET,
});

export const diagnoseDisease: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { base64_image, userId } = request.body;
    if (!base64_image)
      throw new AppError(
        "base64_image is not found in the request body!",
        STATUS_CODE.BAD_REQUEST
      );

    // Make sures the user have enough quota
    const userData = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
    if (userData && userData?.quotaCount <= 0) {
      throw new AppError("User has ran out of quota", STATUS_CODE.FORBIDDEN);
    }

    // Request diagnosis data from GPT
    const dataAnalysis = await diagnoseWithGPT(base64_image);
    if (!dataAnalysis || "message" in dataAnalysis) {
      throw new AppError(
        "Data analysis was not successful",
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    // Upload image to cloud (cloudinary)
    const uploadResult = await cloudinary.uploader.upload(base64_image, {
      public_id: `${userData?.id}`,
    });
    if (!uploadResult) {
      throw new AppError(
        "Something went wrong while trying to upload the image to cloudinary",
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }

    // Save the data in the backend.
    const diagnosisData = await prisma.diagnosis.create({
      data: {
        age: dataAnalysis.skin_age,
        score: dataAnalysis.skin_score,
        type: dataAnalysis.skin_type,
        imgURL: uploadResult.url,
        userId,
        concerns: {
          createMany: {
            data: dataAnalysis.concerns,
          },
        },
      },
    });

    // Reduce the user's quota count
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        quotaCount: {
          decrement: 1,
        },
      },
    });

    response.send({
      status: "success",
      data: diagnosisData,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDiagnosis: RequestHandler = async (
  request,
  response,
  next
) => {
  try {
    const { userId } = request.body;
    if (!userId) {
      throw new AppError(
        "Failed to retrieve user id that should have been embedded in the token",
        STATUS_CODE.INTERNAL_SERVER_ERROR
      );
    }
    const diagnosisData = await prisma.diagnosis.findMany({
      where: {
        userId,
      },
      include: {
        concerns: true,
      },
    });
    if (!diagnosisData) {
      throw new AppError(
        `diagnosis data with the user id of ${userId} was not found`,
        STATUS_CODE.NOT_FOUND
      );
    }

    response.send({
      status: "success",
      data: diagnosisData,
    });
  } catch (error) {
    next(error);
  }
};

export const getDiagnosis: RequestHandler = async (request, response, next) => {
  try {
    const { diagnosisId } = request.params;
    if (!diagnosisId) {
      throw new AppError(
        "diagnosisId is missing in the request url parameter",
        STATUS_CODE.BAD_REQUEST
      );
    }

    const diagnosisData = await prisma.diagnosis.findFirst({
      where: {
        id: +diagnosisId,
      },
      include: {
        concerns: true,
      },
    });
    if (!diagnosisData) {
      throw new AppError(
        `Diagnosis data with the id of ${diagnosisId} was not found`,
        STATUS_CODE.NOT_FOUND
      );
    }

    response.send({
      status: "success",
      data: diagnosisData,
    });
  } catch (error) {
    next(error);
  }
};

const diagnoseWithGPT = async (base64_image: string) => {
  const GPTResponse = await openAI.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: `We're currently playing a role play game, Act like you are a dermatology specialist, from the image given respond in the form of the following JSON. {"skin_score": <SCORE HERE OUT OF 100>, "skin_age": <SKIN AGE HERE>: "skin_type": <TYPE HERE>,"conerns": [{"name": <NAME HERE>, "summary": <DISEASE SUMMARY>, "location": <LOCATION DATA>}]}. e.g. {"skin_score": 80, "skin_type": 24, "skin_type": "Oily", "concerns": [{"name": "acne", "summary": "Acne is an inflammatory disorder of the skin...", "location": "left side of the face"}]}. "skin_type" may only contain either "Normal", "Oily", "Dry" or "Combination". the concerns array can be left empty if no diesases is found. Make sure the respond is not in mark down (raw JSON only)`,
          },
          {
            type: "image_url",
            image_url: {
              url: base64_image,
            },
          },
        ],
      },
    ],
  });

  const dataAnalysisJSON = GPTResponse.choices[0].message.content;
  if (!dataAnalysisJSON) return undefined;
  return JSON.parse(dataAnalysisJSON) as DetectionData;
};
