import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { Client } from 'pg';
import 'source-map-support/register';

import { DB_OPTIONS } from '../../db/constants';
import { dbConnectCallback } from '../../db/db-connect-cb';
import { DML } from '../../db/queries';
import { HEADERS, SPACES_IN_JSON, STATUS_CODES } from '../constants/constants';
import { MyError } from '../utils/error';

export const getProductsList: APIGatewayProxyHandler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  console.log('Get list event: ', event);

  const client = new Client(DB_OPTIONS);
  await client.connect(dbConnectCallback);

  let result;

  try {
    result = await client.query(DML.SELECT_ALL.TEXT);
  } catch (err) {
    throw new MyError(STATUS_CODES.INTERNAL_SERVER_ERROR, err.message);
  } finally {
    client.end();
    console.log('DB disconnected');
  }

  const body = result.rows;

  console.log(body);

  return {
    statusCode: STATUS_CODES.SUCCESS,
    headers: HEADERS,
    body: JSON.stringify(body, null, SPACES_IN_JSON),
  };
}
