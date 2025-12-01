import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export const s3 = new S3Client({
  region: process.env.AWS_S3_BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_BUCKET_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY!,
  },
});

// Upload file
export const uploadToS3 = async (file: any, folder: string) => {
  const fileName = `${folder}/${Date.now()}-${file.name}`;

  const params = {
    Bucket: process.env.AWS_S3_BUCKET_BUCKET_NAME!,
    Key: fileName,
    Body: file.data,
    ContentType: file.mimetype,
  };

  await s3.send(new PutObjectCommand(params));

  return {
    key: fileName,
    url: `https://${process.env.AWS_S3_BUCKET_BUCKET_NAME}.s3.${process.env.AWS_S3_BUCKET_REGION}.amazonaws.com/${fileName}`,
  };
};

// Generate Download URL
export const generateDownloadURL = async (key: string) => {
  const params = {
    Bucket: process.env.AWS_S3_BUCKET_BUCKET_NAME!,
    Key: key,
  };

  return await getSignedUrl(s3, new GetObjectCommand(params), {
    expiresIn: 3600,
  });
};
