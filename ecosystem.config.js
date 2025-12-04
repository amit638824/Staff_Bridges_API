require("dotenv").config();

module.exports = {
  apps: [
    {
      name: "staffbridges_api",
      script: "npx",
      args: "ts-node src/index.ts",
      watch: true, 
      env: {
        NODE_ENV: "development",

        PORT: process.env.PORT,
        UI_BASE_URL: process.env.UI_BASE_URL,
        DEFAULT_FORGOT_PASSWORD_URL: process.env.DEFAULT_FORGOT_PASSWORD_URL, 
        DB_TYPE: process.env.DB_TYPE,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_DATABASE: process.env.DB_DATABASE, 
        JWT_SECRET: process.env.JWT_SECRET, 
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID, 
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASS: process.env.SMTP_PASS,
        BCC_EMAILS: process.env.BCC_EMAILS,
        CONTACT_FORM_RECEIVER: process.env.CONTACT_FORM_RECEIVER, 
        AWS_S3_BUCKET_ACCESS_KEY_ID: process.env.AWS_S3_BUCKET_ACCESS_KEY_ID,
        AWS_S3_BUCKET_SECRET_ACCESS_KEY:
          process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY,
        AWS_S3_BUCKET_REGION: process.env.AWS_S3_BUCKET_REGION,
        AWS_S3_BUCKET_BUCKET_NAME: process.env.AWS_S3_BUCKET_BUCKET_NAME,
      }, 
      env_production: {
        NODE_ENV: "production",

        PORT: process.env.PORT,
        UI_BASE_URL: process.env.UI_BASE_URL,
        DEFAULT_FORGOT_PASSWORD_URL: process.env.DEFAULT_FORGOT_PASSWORD_URL, 
        DB_TYPE: process.env.DB_TYPE,
        DB_HOST: process.env.DB_HOST,
        DB_PORT: process.env.DB_PORT,
        DB_USERNAME: process.env.DB_USERNAME,
        DB_PASSWORD: process.env.DB_PASSWORD,
        DB_DATABASE: process.env.DB_DATABASE, 
        JWT_SECRET: process.env.JWT_SECRET, 
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID, 
        SMTP_HOST: process.env.SMTP_HOST,
        SMTP_PORT: process.env.SMTP_PORT,
        SMTP_USER: process.env.SMTP_USER,
        SMTP_PASS: process.env.SMTP_PASS,
        BCC_EMAILS: process.env.BCC_EMAILS,
        CONTACT_FORM_RECEIVER: process.env.CONTACT_FORM_RECEIVER, 
        AWS_S3_BUCKET_ACCESS_KEY_ID: process.env.AWS_S3_BUCKET_ACCESS_KEY_ID,
        AWS_S3_BUCKET_SECRET_ACCESS_KEY:
          process.env.AWS_S3_BUCKET_SECRET_ACCESS_KEY,
        AWS_S3_BUCKET_REGION: process.env.AWS_S3_BUCKET_REGION,
        AWS_S3_BUCKET_BUCKET_NAME: process.env.AWS_S3_BUCKET_BUCKET_NAME,
      },
    },
  ],
};
