import OpenAI from "openai";
import { DetectionData } from "./types";
import CryptoJS from "crypto-js";

const openAI = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const diagnose = async (base64_image: string) => {
  const prompt = JSON.parse(
    CryptoJS.AES.decrypt(
      process.env.CLIENT_KEY as string,
      process.env.CLIENT_SECRET as string
    )
      .toString(CryptoJS.enc.Utf8)
      .replace("{{{IMAGE_STRING}}}", base64_image)
  );

  const GPTResponse = await openAI.chat.completions.create(prompt);

  const dataAnalysisJSON = GPTResponse.choices[0].message.content;
  if (!dataAnalysisJSON) return undefined;
  return JSON.parse(dataAnalysisJSON) as DetectionData;
};
