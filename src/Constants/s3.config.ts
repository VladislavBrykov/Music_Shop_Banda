const AWS = require('aws-sdk');
export const s3 = new AWS.S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  signatureVersion: process.env.S3_SIGNATURE_VERSION,
  region: process.env.S3_REGION,
});
