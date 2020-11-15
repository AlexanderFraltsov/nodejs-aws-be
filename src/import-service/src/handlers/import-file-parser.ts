import csv from 'csv-parser';
import S3 from 'aws-sdk/clients/s3';
import { S3Event } from 'aws-lambda';

import { BUCKET } from '../constants';

export const importFileParser = async (event: S3Event) => {
  const s3 = new S3({ region: 'eu-west-1'});

  for (const record of event.Records) {
    const { key } = record.s3.object;

    const s3Stream = s3.getObject({
      Bucket: BUCKET,
      Key: key
    }).createReadStream();

    await new Promise((res,rej) => {
      s3Stream.pipe(csv())
        .on('data', (data) => {
          console.log(data);
        })
        .on('error', (error) => {
          rej(error);
        })
        .on('end', async () => {
          console.log(`Copy from ${BUCKET}/${key}`);

          await s3.copyObject({
            Bucket: BUCKET,
            CopySource: `${BUCKET}/${key}`,
            Key: key.replace('uploaded', 'parsed')
          }).promise();

          console.log(`${key.split('/')[1]} was copied`);
          res();
          // await s3.deleteObject({
          //   Bucket: BUCKET,
          //   Key: key
          // }).promise();
        })
    })

  }

  return {
    statusCode: 202
  };
}
