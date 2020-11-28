import { APIGatewayTokenAuthorizerHandler } from 'aws-lambda';
import 'source-map-support/register';

import { authorizationTokenEncoder, generatePolicy } from '../utils';

const UNAUTH = 'Unauthorized';

export const basicAuthorizer: APIGatewayTokenAuthorizerHandler = async (
  event
) => {

  console.log("Event: ", JSON.stringify(event));

  if (event['type'] !== 'TOKEN') {
    throw new Error(UNAUTH);
  }

  try {
    const {
      encodedCreds,
      username,
      password
    } = authorizationTokenEncoder(event.authorizationToken);

    console.log (`username: ${username}, password: ${password}` );

    const storedUserPassword = process.env[username];

    if (!storedUserPassword || storedUserPassword !== password){
      const effect = 'Deny';
      const message = 'Error: Access denied. This login-password pair is wrong';
      return generatePolicy(encodedCreds, event.methodArn, effect, message);
    }

    return generatePolicy(encodedCreds, event.methodArn);

  } catch (e) {
    console.error(e);
    throw new Error(e.message);
  }
}
