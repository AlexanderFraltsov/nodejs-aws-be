import { APIGatewayAuthorizerResult } from 'aws-lambda';

export const generatePolicy = (
  principalId: string,
  resource: string,
  effect = 'Allow',
  message = 'Success'
) : APIGatewayAuthorizerResult => {
  return {
    principalId,
    context: {
      message
    },
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api:Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }
}
