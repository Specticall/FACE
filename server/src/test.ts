import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import { convertToBase64 } from "./lib/helper";
import { config } from "dotenv";

config({ path: "./.env" });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

async function main() {
  const fileBuffer = await fs.readFile(`${__dirname}/../images/174032094.png`);
  const base64File = await convertToBase64(fileBuffer);
  const uploadResult = await cloudinary.uploader.upload(base64File, {
    public_id: "test-upload",
  });
  return uploadResult;
}

main();
