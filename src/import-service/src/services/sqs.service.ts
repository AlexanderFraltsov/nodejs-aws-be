import SQS from 'aws-sdk/clients/sqs';

import { AWS_CONFIG } from '../../../common/constants';

const sqsUrl = process.env.SQS_URL;

class SQSService {
  private client = new SQS({ region: AWS_CONFIG.REGION });

  public async sendMessage(message) {
    const params = {
      QueueUrl: sqsUrl,
      MessageBody: JSON.stringify(message)
    }
    return await this.client
      .sendMessage(params)
      .promise();
  }
}

export const simpleQueueService = new SQSService();
