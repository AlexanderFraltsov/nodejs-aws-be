import { mockEventCreator } from 'aws-lambda-test-utils';

import { getProductsById } from '../../handler';
import { MESSAGES, STATUS_CODES } from '../../../common/constants';
/*
it('It should get product by ID', async () => {
  expect.assertions(1);

  const product = products[0];
  const APIGatewayEvent = mockEventCreator
    .createAPIGatewayEvent({
      pathParameters: {
        id: products[0].id
      }
    });

  const output = {
    statusCode: STATUS_CODES.SUCCESS,
    headers: HEADERS,
    body: JSON.stringify(product, null, SPACES_IN_JSON),
  }

  const data = await getProductsById(APIGatewayEvent);
  expect(data).toEqual(output)
});*/

it('It should get 404 error by invalide ID', async () => {
  expect.assertions(1);

  const APIGatewayEvent = mockEventCreator
    .createAPIGatewayEvent({
      pathParameters: {
        id: `undefined`
      }
    });

  const output = {
    statusCode: STATUS_CODES.PRODUCT_NOT_FOUND,
    body: JSON.stringify(MESSAGES.PRODUCT_NOT_FOUND)
  }

  const data = await getProductsById(APIGatewayEvent);
  expect(data).toEqual(output)
});
