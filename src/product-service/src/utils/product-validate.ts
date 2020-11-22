import { MESSAGES, STATUS_CODES, COMMON_PATH } from '../../../common/constants';
import { IProduct } from '../models/product.model';
import { MyError } from './error';

export const productValidate = (product: IProduct): IProduct => {
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

  if ( !description || typeof description !== "string" ) {
    throw new MyError(STATUS_CODES.PRODUCT_DATA_IS_INVALID, `${MESSAGES.PRODUCT_DATA_IS_INVALID}: description`);
  }

  if (!image || typeof image !== "string") {
    const mockImage = `${COMMON_PATH}1269/product_1269_5a3a6e1e95fd2_medium.jpg`;
    return { ...product, image: mockImage }
  }

  return product;
}
