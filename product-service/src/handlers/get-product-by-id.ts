import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { HEADERS, MESSAGES, SPACES_IN_JSON, STATUS_CODES } from '../constants/constants';
import { products } from '../mock-data/products';
import { IProduct } from '../models/product.model';
import { addDelay } from '../utils/add-delay';
import { MyError } from '../utils/error';

export const getProductsById: APIGatewayProxyHandler = async (event) => {

  const id = await addDelay(event.pathParameters.id);
  const product: IProduct = products.find(el => el.id === id);

  if (!product) {
    throw new MyError(STATUS_CODES.PRODUCT_NOT_FOUND, MESSAGES.PRODUCT_NOT_FOUND);
  }

  return {
    statusCode: STATUS_CODES.SUCCESS,
    headers: HEADERS,
    body: JSON.stringify(product, null, SPACES_IN_JSON),
  };
}
