const DELAY_MS = 100;
const SPACES_IN_JSON = 2;

const STATUS_CODES: {[key: string] : number} = {
  SUCCESS: 200,
  PRODUCT_NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500
}
const MESSAGES: {[key: string] : string} = {
  SUCCESS: 'OK',
  PRODUCT_NOT_FOUND: 'Product not found',
  INTERNAL_SERVER_ERROR: 'Internal Server Error'
}

const COMMON_PATH = 'https://media.rollerderbyhouse.eu/CommerceManager/Products/';

export {
  DELAY_MS,
  SPACES_IN_JSON,
  COMMON_PATH,
  STATUS_CODES,
  MESSAGES
}
