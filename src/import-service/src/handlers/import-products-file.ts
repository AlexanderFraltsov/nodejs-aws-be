import { APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda';
import 'source-map-support/register';

import { simpleStorageService } from '../services/s3.service';
import { httpResponse } from '../../../utils/http-response';
import { PATHES, STATUS_CODES } from '../../../common/constants';

export const importProductsFile: APIGatewayProxyHandler = async (
  event,
  _context
): Promise<APIGatewayProxyResult> => {
  console.log(event);

  try {
    const { name } = event.queryStringParameters;
    if (!name) {
      return httpResponse(STATUS_CODES.PRODUCT_DATA_IS_INVALID, 'Bad request');
    }
    const path = `${PATHES.UPLOADED}/${name}`;
    const url = await simpleStorageService.getSignedUrl(path);

    return httpResponse(STATUS_CODES.SUCCESS, url);
  } catch (err) {
    return httpResponse(STATUS_CODES.INTERNAL_SERVER_ERROR, err.message);
  }
}
