import { getProductsById } from './src/handlers/get-product-by-id';
import { getProductsList } from './src/handlers/get-products-list';
import { catchErrors } from './src/utils/error';

const getList = catchErrors(getProductsList);
const getOneById = catchErrors(getProductsById);

export {
  getList as getProductsList,
  getOneById as getProductsById
}
