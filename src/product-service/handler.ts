import { getProductsById } from './src/handlers/get-product-by-id';
import { getProductsList } from './src/handlers/get-products-list';
import { postProduct } from './src/handlers/post-product';
import { invoke } from './db/pg-client-lambda';

export {
  getProductsList,
  getProductsById,
  postProduct,
  invoke
}
