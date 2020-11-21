import S3 from 'aws-sdk/clients/s3';

import { AWS_CONFIG } from '../constants';

class S3Service {
  private client = new S3({ region: AWS_CONFIG.REGION });

  public async getSignedUrl(path: string): Promise<string> {
    const params = {
      Bucket: AWS_CONFIG.BUCKET,
      Key: path,
      Expires: 60,
      ContentType: 'text/csv'
    };
    return await this.client.getSignedUrlPromise('putObject', params);
  }
}

export const simpleStorageService = new S3Service();
