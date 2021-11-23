import { s3 } from '../../../Constants/s3.config';

export async function getUrl(filename) {
  return s3.getSignedUrl('getObject', {
    Bucket: process.env.S3_BASKET,
    Key: filename,
    Expires: Number(process.env.S3_LIVE_URL_TIME),
  });
}
