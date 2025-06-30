import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const ACCESS_KEY = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const SECRET_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const ENDPOINT = process.env.CLOUDFLARE_R2_ENDPOINT;

if (!ACCESS_KEY || !SECRET_KEY || !ENDPOINT) {
  throw new Error(
    "Missing Cloudflare R2 credentials or endpoint in environment variables."
  );
}

const s3Client = new S3Client({
  region: "auto",
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});

export default async function UpdateTimes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const body = req.body;
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: "besttimes.json",
        Body: JSON.stringify(body),
        ContentType: "application/json",
      })
    );
    res.status(200).json("its fine");
  } else {
    res.status(405).json("its not fine");
  }
}
