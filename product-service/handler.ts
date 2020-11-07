import { getProductsById } from './src/handlers/get-product-by-id';
import { getProductsList } from './src/handlers/get-products-list';
import { invoke } from './db/pg-client-lambda';
import { catchErrors } from './src/utils/error';

const getList = catchErrors(getProductsList);
const getOneById = catchErrors(getProductsById);

export {
  getList as getProductsList,
  getOneById as getProductsById,
  invoke
}
