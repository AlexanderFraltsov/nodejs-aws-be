import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { HEADERS, SPACES_IN_JSON, STATUS_CODES } from '../constants/constants';
import { products } from '../mock-data/products';
import { addDelay } from '../utils/add-delay';

export const getProductsList: APIGatewayProxyHandler = async () => {
  const body = await addDelay(products);

  return {
    statusCode: STATUS_CODES.SUCCESS,
    headers: HEADERS,
    body: JSON.stringify(body, null, SPACES_IN_JSON),
  };
}
