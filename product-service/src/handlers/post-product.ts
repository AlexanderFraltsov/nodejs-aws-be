import { Client } from 'pg';
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { DB_OPTIONS } from '../../db/constants';
import { dbConnectCallback } from '../../db/db-connect-cb';
import { DML } from '../../db/queries';
import { HEADERS, MESSAGES, SPACES_IN_JSON, STATUS_CODES } from '../constants/constants';
import { MyError } from '../utils/error';
import { productValidate } from '../utils/product-validate';


export const postProduct: APIGatewayProxyHandler = async (event) => {

  console.log('Post product event: ', event);

  const product = productValidate(JSON.parse(event.body));
  let id: string;

  const client = new Client(DB_OPTIONS);
  await client.connect(dbConnectCallback);

  try {
    const insertedProduct = await client.query(DML.INSERT_PRODUCTS.TEXT, [product.title, product.description, product.price, product.image]);
    id = insertedProduct.rows[0].id;
    await client.query(DML.INSERT_STOCKS.TEXT, [id, product.count]);
  } catch (err) {
    throw new MyError(STATUS_CODES.INTERNAL_SERVER_ERROR, err.message);
  } finally {
    client.end();
    console.log('DB disconnected');
  }

  if (!product) {
    throw new MyError(STATUS_CODES.PRODUCT_NOT_FOUND, MESSAGES.PRODUCT_NOT_FOUND);
  }

  return {
    statusCode: STATUS_CODES.SUCCESS,
    headers: HEADERS,
    body: JSON.stringify({...product, id}, null, SPACES_IN_JSON),
  };
}
