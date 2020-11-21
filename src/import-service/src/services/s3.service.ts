import S3 from 'aws-sdk/clients/s3';

import { AWS_CONFIG } from '../constants';

class S3Service {
  private client = new S3({ region: AWS_CONFIG.REGION });

  public createReadStream(key: string) {
    const params = {
      Bucket: AWS_CONFIG.BUCKET,
      Key: key
    }
    return this.client
      .getObject(params)
      .createReadStream();
  }

  public async getSignedUrl(path: string): Promise<string> {
    const params = {
      Bucket: AWS_CONFIG.BUCKET,
      Key: path,
      Expires: 60,
      ContentType: 'text/csv'
    };
    return await this.client.getSignedUrlPromise('putObject', params);
  }

  public async copyObject (key: string) {
    console.log(`Copy from ${AWS_CONFIG.BUCKET}/${key}`);
    const params = {
      Bucket: AWS_CONFIG.BUCKET,
      CopySource: `${AWS_CONFIG.BUCKET}/${key}`,
      Key: key.replace('uploaded', 'parsed')
    }

    const result = await this.client.copyObject(params).promise();
    console.log(`${key.split('/')[1]} was copied to parsed/`);
    return result;
  }

  public async deleteObject (key: string) {
    const params = {
      Bucket: AWS_CONFIG.BUCKET,
      Key: key
    }
    const result =  await this.client.deleteObject(params).promise();
    console.log(`${key.split('/')[1]} was deleted from uploaded/`);
    return result;
  }
}

export const simpleStorageService = new S3Service();
