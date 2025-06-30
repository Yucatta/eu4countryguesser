import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { NextApiRequest, NextApiResponse } from "next";
import { Readable } from "stream";

const BUCKET_NAME = process.env.CLOUDFLARE_R2_BUCKET_NAME;
const ACCESS_KEY = process.env.CLOUDFLARE_R2_ACCESS_KEY_ID;
const SECRET_KEY = process.env.CLOUDFLARE_R2_SECRET_ACCESS_KEY;
const ENDPOINT = process.env.CLOUDFLARE_R2_ENDPOINT;

if (!ACCESS_KEY || !SECRET_KEY || !ENDPOINT) {
  throw new Error("invalid Bucket Credentials");
}

const s3Client = new S3Client({
  region: "auto",
  endpoint: ENDPOINT,
  credentials: {
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
  },
});
async function streamToString(stream: Readable): Promise<string> {
  const chunks: Uint8Array[] = [];
  for await (const chunk of stream) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks).toString("utf-8");
}

export default async function FetchTimes(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const cmd = new GetObjectCommand({
      Bucket: BUCKET_NAME,
      Key: "besttimes.json",
    });

    const response = await s3Client.send(cmd);

    if (!response.Body || !(response.Body instanceof Readable)) {
      throw new Error("Unexpected response body.");
    }

    const jsonString = await streamToString(response.Body);
    let parsed: unknown;

    try {
      parsed = JSON.parse(jsonString);
    } catch {
      throw new Error("NO");
    }
    res
      .status(200)
      .json({ message: "Data successfully written to CSV", BestTimes: parsed });
  } else {
    res.status(405).json({ error: "NOT GET" });
  }
}
