export const authorizationTokenEncoder = (authorizationToken: string) => {
  const encodedCreds = authorizationToken.split(' ')[1];
  const buff = Buffer.from(encodedCreds, 'base64');
  const [username, password] = buff.toString('utf-8').split(':');
  return {
    encodedCreds,
    username,
    password
  }
}
