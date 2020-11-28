import { SNS } from 'aws-sdk';

import { AWS_CONFIG, SPACES_IN_JSON } from '../../../common/constants';

class SNSService {
  private client = new SNS({ region: AWS_CONFIG.REGION });

  public async publish(product) {
    const params = {
      Subject: 'Product created',
      Message: JSON.stringify(product, null, SPACES_IN_JSON),
      TopicArn: process.env.SNS_ARN
    }
    return await this.client.publish(params).promise();
  }
}

export const simpleNotificationService = new SNSService();
