import { MESSAGES, STATUS_CODES } from '../../../common/constants';
import { IProduct } from '../models/product.model';
import { MyError } from './error';

export const productValidate = (product: IProduct): IProduct => {
  const { description, count, title, price } = product;

  if (!count || typeof +count !== "number") {
    throw new MyError(STATUS_CODES.PRODUCT_DATA_IS_INVALID, `${MESSAGES.PRODUCT_DATA_IS_INVALID}: count`);
  }

  if (!title || typeof title !== "string") {
    throw new MyError(STATUS_CODES.PRODUCT_DATA_IS_INVALID, `${MESSAGES.PRODUCT_DATA_IS_INVALID}: title`);
  }

  if (!price || typeof +price !== "number") {
    throw new MyError(STATUS_CODES.PRODUCT_DATA_IS_INVALID, `${MESSAGES.PRODUCT_DATA_IS_INVALID}: price`);
  }

  if ( !description || typeof description !== "string" ) {
    throw new MyError(STATUS_CODES.PRODUCT_DATA_IS_INVALID, `${MESSAGES.PRODUCT_DATA_IS_INVALID}: description`);
  }

  return product;
}
