import { COMMON_PATH } from '../constants/constants';
import { IProduct } from '../models/product.model';
import { v4 as uuidv4 } from 'uuid';

export const products: IProduct[] = [
  {
    id: `${uuidv4()}`,
    name: 'CHAYA Lifestyle Melrose Elite Love is Love',
    type: 'Retro Skates & Disco Roller',
    price: 159.95,
    image: `${COMMON_PATH}1591/product_1591_5f9058d0760b7_medium.jpg`
  },
  {
    id: `${uuidv4()}`,
    name: 'RIEDELL Torch Neo',
    type: 'Roller derby skates',
    price: 624.95,
    image: `${COMMON_PATH}1269/product_1269_5a3a6e1e95fd2_medium.jpg`
  }
];