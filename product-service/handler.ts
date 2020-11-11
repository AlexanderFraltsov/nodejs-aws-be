import { getProductsById } from './src/handlers/get-product-by-id';
import { getProductsList } from './src/handlers/get-products-list';
import { postProduct } from './src/handlers/post-product';
import { invoke } from './db/pg-client-lambda';
import { catchErrors } from './src/utils/error';

const getList = catchErrors(getProductsList);
const getOneById = catchErrors(getProductsById);
const postOne = catchErrors(postProduct);

export {
  getList as getProductsList,
  getOneById as getProductsById,
  postOne as postProduct,
  invoke
}
