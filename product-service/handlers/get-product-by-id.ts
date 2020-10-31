import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { SPACES_IN_JSON, SUCCESS_STATUS_CODE } from '../constants/constants';
import { addDelay } from '../utils/add-delay';

export const getProductsById: APIGatewayProxyHandler = async (event) => {
  const body = await addDelay(JSON.parse(event.body));

  return {
    statusCode: SUCCESS_STATUS_CODE,
    body: JSON.stringify(body, null, SPACES_IN_JSON),
  };
}
