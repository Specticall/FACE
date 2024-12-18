import axios from "axios";
import { Buffer } from "buffer";
import { GoogleProfile } from "./types";

export async function convertToBase64(buffer: Buffer) {
  // Normal ES imports doesn't seem to work
  const { fileTypeFromBuffer } = await import("file-type");
  const fileType = await fileTypeFromBuffer(buffer);
  const base64FileWithDetails = `data:${
    fileType?.mime
  };base64,${buffer.toString("base64")}`;

  return base64FileWithDetails;
}

export async function getGoogleProfileFromToken(token: string) {
  try {
    const res = await axios.get<GoogleProfile | { error_description: string }>(
      `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`
    );

    if ("error_description" in res.data) {
      return undefined;
    }

    return res.data;
  } catch (err) {
    return undefined;
  }
}
