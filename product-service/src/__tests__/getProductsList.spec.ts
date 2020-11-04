import { getProductsList } from '../../handler';
import { HEADERS, SPACES_IN_JSON, STATUS_CODES } from '../constants/constants';
import { products } from '../mock-data/products';

it('It should get all products', async () => {
  expect.assertions(1);
  const output = {
    statusCode: STATUS_CODES.SUCCESS,
    headers: HEADERS,
    body: JSON.stringify(products, null, SPACES_IN_JSON),
  }
  const data = await getProductsList();
  expect(data).toEqual(output)
});
