import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { HEADERS, MESSAGES, SPACES_IN_JSON, STATUS_CODES } from '../../../common/constants';
import { createProduct } from '../../db/create-product';
import { MyError, catchErrors } from '../utils/error';
import { productValidate } from '../utils/product-validate';

export const postProduct: APIGatewayProxyHandler = catchErrors(
  async (event) => {

    const body = JSON.parse(event.body);
    console.log('Post product event: ', event);
    console.log('Product: ', body);

    const product = productValidate(body);

    if (!product) {
      throw new MyError(STATUS_CODES.PRODUCT_NOT_FOUND, MESSAGES.PRODUCT_NOT_FOUND);
    }

    const productFromBase = await createProduct(product, (err) => {
      throw new MyError(STATUS_CODES.INTERNAL_SERVER_ERROR, err.message);
    });

    return {
      statusCode: STATUS_CODES.SUCCESS,
      headers: HEADERS,
      body: JSON.stringify({...productFromBase}, null, SPACES_IN_JSON),
    };
  }
)
