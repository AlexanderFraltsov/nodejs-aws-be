import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { SPACES_IN_JSON, SUCCESS_STATUS_CODE } from '../constants/constants';
import { products } from '../mock-data/products';
import { addDelay } from '../utils/add-delay';

export const getProductsList: APIGatewayProxyHandler = async () => {
  const body = await addDelay(products);

  return {
    statusCode: SUCCESS_STATUS_CODE,
    body: JSON.stringify(body, null, SPACES_IN_JSON),
  };
}
