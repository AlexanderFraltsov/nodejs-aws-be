import { SNS } from 'aws-sdk';

import { AWS_CONFIG } from '../../../common/constants';

class SNSService {
  private client = new SNS({ region: AWS_CONFIG.REGION });

  public async publish(messages: string[]) {
    const params = {
      Subject: 'You are invited processed',
      Message: JSON.stringify(messages),
      TopicArn: process.env.SNS_ARN
    }
    return this.client.publish(params, () => {
      console.log('Send email: ' + JSON.stringify(messages))
    });
  }
}

export const simpleNotificationService = new SNSService();
