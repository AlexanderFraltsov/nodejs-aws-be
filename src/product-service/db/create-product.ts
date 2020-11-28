import { IProduct } from '../src/models/product.model';
import { createClient } from './client';
import { DML } from './queries';

export const createProduct = async (product: IProduct, errorCb): Promise<IProduct> => {
  let id: string;

  const { title, description, price, count } = product;

  const client = await createClient();

  try {
    await client.query('BEGIN');
    const insertedProduct = await client.query(DML.INSERT_PRODUCTS.TEXT, [title, description, price]);
    id = insertedProduct.rows[0].id;
    await client.query(DML.INSERT_STOCKS.TEXT, [id, count]);
    await client.query('COMMIT');
  } catch (err) {
    await client.query('ROLLBACK');
    errorCb(err);
  } finally {
    client.end();
    console.log('DB disconnected');
    return { ...product, id }
  }
}
