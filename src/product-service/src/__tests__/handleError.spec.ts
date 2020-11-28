import { handleError } from '../utils/error';
import { STATUS_CODES } from '../../../common/constants';

describe('function handleError', () => {
  test('It should set all parameters from error', () => {
    const message = 'Not found';
    const statusCode = 404;
    const input = { message, statusCode };
    const output = { statusCode, body: JSON.stringify(message) }
    expect(handleError(input)).toEqual(output)
  })
  test('It should set 500 error if statusCode undefined', () => {
    const message = 'Some error';
    const statusCode = undefined;
    const input = { message, statusCode };
    const output = {
      statusCode: STATUS_CODES.INTERNAL_SERVER_ERROR,
      body: JSON.stringify(message)
    }
    expect(handleError(input)).toEqual(output)
  })
})
