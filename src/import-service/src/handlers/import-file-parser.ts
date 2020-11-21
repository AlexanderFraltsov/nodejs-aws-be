import { S3Event } from 'aws-lambda';
import csv from 'csv-parser';

import { simpleStorageService } from '../services/s3.service';

export const importFileParser = async (event: S3Event) => {

  for (const record of event.Records) {
    const { key } = record.s3.object;
    const s3Stream = simpleStorageService.createReadStream(key);

    try {
      await new Promise((res,rej) => {
        s3Stream.pipe(csv())
          .on('data', (data) => {
            console.log(data);
          })
          .on('error', (error) => {
            rej(error);
          })
          .on('end', async () => {
            await simpleStorageService.copyObject(key);
            await simpleStorageService.deleteObject(key);
            res();
          })
      })
    } catch (error) {
      return {
        statusCode: 500,
        body: error.message
      }
    }
  }

  return {
    statusCode: 202
  };
}
