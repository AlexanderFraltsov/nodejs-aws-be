import { S3Event } from 'aws-lambda';
import csv from 'csv-parser';

import { STATUS_CODES } from '../../../common/constants';
import { simpleStorageService } from '../services/s3.service';
import { simpleQueueService } from '../services/sqs.service';

export const importFileParser = async (event: S3Event) => {
  console.log(event);

  for (const record of event.Records) {
    const { key } = record.s3.object;
    const s3Stream = simpleStorageService.createReadStream(key);
    const result = [];
    try {
      const products = await new Promise((res,rej) => {
        s3Stream.pipe(csv())
          .on('data', (data) => {
            console.log(data);
            result.push(data);
          })
          .on('error', (error) => {
            rej(error);
          })
          .on('end', async () => {
            await simpleStorageService.copyObject(key);
            await simpleStorageService.deleteObject(key);
            res(result);
          })
      })
      console.log(products);
      await simpleQueueService.sendMessage(products);
    } catch (error) {
      return {
        statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
        body: error.message
      }
    }
  }

  return {
    statusCode: STATUS_CODES.SUCCESS
  };
}
