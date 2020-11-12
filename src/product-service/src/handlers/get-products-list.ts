import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { APIGatewayProxyHandler } from 'aws-lambda';
import 'source-map-support/register';

import { createClient } from '../../db/client';
import { DML } from '../../db/queries';
import { HEADERS, SPACES_IN_JSON, STATUS_CODES } from '../constants/constants';
import { MyError, catchErrors } from '../utils/error';

export const getProductsList: APIGatewayProxyHandler = catchErrors(
  async (
    event: APIGatewayProxyEvent
  ): Promise<APIGatewayProxyResult> => {
    console.log('Get list event: ', event);

    const client = await createClient();

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
)
