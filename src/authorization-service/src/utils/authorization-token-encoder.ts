export const authorizationTokenEncoder = (authorizationToken: string) => {

  const [type, encodedCreds] = authorizationToken.split(' ');
  if (type !== 'Basic') {
    throw new Error('Invalid token');
  }
  const buff = Buffer.from(encodedCreds, 'base64');
  const [username, password] = buff.toString('utf-8').split(':');
  return {
    encodedCreds,
    username,
    password
  }
}
