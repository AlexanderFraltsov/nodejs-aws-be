import { PolicyDocument } from 'aws-lambda';

type Policy = {
  principalId: string,
  policyDocument: PolicyDocument
}

export const generatePolicy = (
  principalId: string,
  resource: string,
  effect = 'Allow'
) : Policy => {
  return {
    principalId,
    policyDocument: {
      Version: '2012-10-17',
      Statement: [
        {
          Action: 'execute-api: Invoke',
          Effect: effect,
          Resource: resource
        }
      ]
    }
  }
}
