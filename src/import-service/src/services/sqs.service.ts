import SQS from 'aws-sdk/clients/sqs';

import { AWS_CONFIG } from '../constants';

class SQSService {
  private client = new SQS({ region: AWS_CONFIG.REGION });

  public async sendMessage(message) {
    const params = {
      QueueUrl: process.env.SQS_URL,
      MessageBody: message
    }
    return this.client.sendMessage(params, () => {
      `Send message: ${message}`
    });
  }
}

export const simpleQueueService = new SQSService();
