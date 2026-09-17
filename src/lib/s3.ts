import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3Client = new S3Client({
  endpoint: process.env.AWS_ENDPOINT_URL_S3,
  region: process.env.AWS_REGION || "us-east-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
  forcePathStyle: true,
});

export const BUCKET_NAME = process.env.S3_BUCKET_NAME || "assets";

export async function uploadFileToS3(
  key: string,
  body: Buffer | Uint8Array | string,
  contentType?: string
) {
  const command = new PutObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
    Body: body,
    ContentType: contentType || "application/octet-stream",
  });
  await s3Client.send(command);

  return getPresignedDownloadUrl(key);
}

export async function getPresignedDownloadUrl(key: string, expiresIn = 86400) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: key,
  });
  return await getSignedUrl(s3Client, command, { expiresIn });
}
