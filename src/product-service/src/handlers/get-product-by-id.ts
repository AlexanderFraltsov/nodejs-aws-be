import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { createClient } from '../../db/client';
import { DML } from '../../db/queries';
import { HEADERS, MESSAGES, SPACES_IN_JSON, STATUS_CODES } from '../constants/constants';
import { catchErrors, MyError } from '../utils/error';

export const getProductsById: APIGatewayProxyHandler = catchErrors(
  async (event) => {
    console.log('Get product event: ', event);

    const client = await createClient();

    let result;

    try {
      result = await client.query(DML.SELECT_ONE.TEXT, [event.pathParameters.id]);
    } catch (err) {
      throw new MyError(STATUS_CODES.INTERNAL_SERVER_ERROR, err.message);
    } finally {
      client.end();
      console.log('DB disconnected');
    }

    const product = result.rows[0];

    if (!product || product.length === 0) {
      throw new MyError(STATUS_CODES.PRODUCT_NOT_FOUND, MESSAGES.PRODUCT_NOT_FOUND);
    }

    return {
      statusCode: STATUS_CODES.SUCCESS,
      headers: HEADERS,
      body: JSON.stringify(product, null, SPACES_IN_JSON),
    };
  }
)
