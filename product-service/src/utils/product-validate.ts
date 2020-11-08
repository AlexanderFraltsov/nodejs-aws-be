import { MESSAGES, STATUS_CODES, COMMON_PATH } from '../constants/constants';
import { IProduct, SKATE_TYPES } from '../models/product.model';
import { MyError } from './error';

export const productValidate = (product): IProduct => {
  const { description, count, title, price, image } = product;

  if (!count || typeof +count !== "number") {
    throw new MyError(STATUS_CODES.PRODUCT_DATA_IS_INVALID, `${MESSAGES.PRODUCT_DATA_IS_INVALID}: count`);
  }

  if (!title || typeof title !== "string") {
    throw new MyError(STATUS_CODES.PRODUCT_DATA_IS_INVALID, `${MESSAGES.PRODUCT_DATA_IS_INVALID}: title`);
  }

  if (!price || typeof +price !== "number") {
    throw new MyError(STATUS_CODES.PRODUCT_DATA_IS_INVALID, `${MESSAGES.PRODUCT_DATA_IS_INVALID}: price`);
  }

  const validatingProduct = { ...product };

  if ( !description ||
    description !== SKATE_TYPES.DERBY ||
    description !== SKATE_TYPES.RETRO ) {
    validatingProduct.description = SKATE_TYPES.DERBY
  }

  if (!image || typeof image !== "string") {
    validatingProduct.image = `${COMMON_PATH}1269/product_1269_5a3a6e1e95fd2_medium.jpg`;
  }

  return validatingProduct;
}
