import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { DELAY_MS, SPACES_IN_JSON, SUCCESS_STATUS_CODE } from './constants/constants';
import { products } from './mock-data/products';

const addDelay = async () => {
  return new Promise(
    (resolve) => setTimeout(
      () => resolve(products),
      DELAY_MS
    )
  );
}

export const getProducts: APIGatewayProxyHandler = async () => {
  const body = await addDelay();

  return {
    statusCode: SUCCESS_STATUS_CODE,
    body: JSON.stringify(body, null, SPACES_IN_JSON),
  };
}
