import csv from 'csv-parser';
import S3 from 'aws-sdk/clients/s3';
import { S3Event } from 'aws-lambda';

import { BUCKET } from '../constants';

const copyObject = async (client, key: string) => {
  console.log(`Copy from ${BUCKET}/${key}`);
  const params = {
    Bucket: BUCKET,
    CopySource: `${BUCKET}/${key}`,
    Key: key.replace('uploaded', 'parsed')
  }

  const result = await client.copyObject(params).promise();
  console.log(`${key.split('/')[1]} was copied to parsed/`);
  return result;
}

const deleteObject = async (client, key: string) => {
  const params = {
    Bucket: BUCKET,
    Key: key
  }
  const result =  await client.deleteObject(params).promise();
  console.log(`${key.split('/')[1]} was deleted from uploaded/`);
  return result;
}

export const importFileParser = async (event: S3Event) => {
  const s3 = new S3({ region: 'eu-west-1'});

  for (const record of event.Records) {
    const { key } = record.s3.object;

    const s3Stream = s3.getObject({
      Bucket: BUCKET,
      Key: key
    }).createReadStream();

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
            await copyObject(s3, key);
            await deleteObject(s3, key);
            res();
          })
      })
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message
      }
    }
  }

  return {
    statusCode: 202
  };
}
