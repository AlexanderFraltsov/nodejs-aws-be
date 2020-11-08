import { Client } from 'pg';
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { DB_OPTIONS } from '../../db/constants';
import { dbConnectCallback } from '../../db/db-connect-cb';
import { DML } from '../../db/queries';
import { HEADERS, MESSAGES, SPACES_IN_JSON, STATUS_CODES } from '../constants/constants';
import { MyError } from '../utils/error';


export const getProductsById: APIGatewayProxyHandler = async (event) => {

  console.log('Get product event: ', event);

  const client = new Client(DB_OPTIONS);
  client.connect(dbConnectCallback);

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
