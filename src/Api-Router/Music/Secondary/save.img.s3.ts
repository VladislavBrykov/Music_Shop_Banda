import { s3 } from '../../../Constants/s3.config';
import fs from 'fs';

export async function saveImgS3(file) {
  fs.readFile(file.path, async function (err, data) {
    if (err) throw err;
    const params = {
      Bucket: process.env.S3_BASKET,
      Key: file.filename.substring(1),
      Body: data,
      ContentType: file.mimetype,
    };
    await s3.upload(params, async function (err, data) {
      await fs.unlink(file.path, function (err) {
        if (err) {
          return false;
        }
      });
      return true;
    });
  });
}
