import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';

import { simpleStorageService } from '../services/s3.service';
import { httpResponse } from '../utils/http-response';

export const importProductsFile: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  console.log(event);

  try {
    const { name } = event.queryStringParameters;
    if (!name) {
      return httpResponse(400, 'Bad request');
    }
    const path = `uploaded/${name}`;
    const url = await simpleStorageService.getSignedUrl(path);

    return httpResponse(200, url);
  } catch (err) {
    return httpResponse(500, err.message);
  }
}
