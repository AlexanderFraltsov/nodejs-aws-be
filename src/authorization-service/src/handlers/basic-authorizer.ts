import 'source-map-support/register';

import { authorizationTokenEncoder, generatePolicy } from '../utils';

const UNAUTH = 'Unauthorized';

export const basicAuthorizer = (event, context, callback) => {

  console.log("Event: ", JSON.stringify(event));

  if (event['type'] !== 'TOKEN') {
    callback(UNAUTH);
  }

  try {
    const {
      encodedCreds,
      username,
      password
    } = authorizationTokenEncoder(event.authorizationToken);

    console.log (`username: ${username}, password: ${password}` );

    const storedUserPassword = process.env[username];

    const effect = !storedUserPassword ||
      storedUserPassword !== password ? 'Deny' : 'Allow';

    const policy = generatePolicy(encodedCreds, event.methodArn, effect);

    callback(null, policy);
  } catch (e) {
    callback(`${UNAUTH}: ${e.message}`);
  }
}
