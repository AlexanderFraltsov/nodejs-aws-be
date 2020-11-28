import { HEADERS } from '../common/constants';

export const httpResponse = (statusCode: number, body: string) => ({
  statusCode,
  body,
  headers: HEADERS
});
