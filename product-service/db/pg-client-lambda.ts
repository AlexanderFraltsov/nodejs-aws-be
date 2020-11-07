import { DB_OPTIONS, MESSAGES } from './constants';
import { dbConnectCallback } from './db-connect-cb';
import { DML, DDL } from './queries';

const { Client } = require('pg');

const connectToDbAndInvoke = async (queries) => {
  const client = new Client(DB_OPTIONS);
  await client.connect(dbConnectCallback);
  const results = [];
  try {
    for (const query of queries) {
      const [text, values] = query;
      const result = await client.query(text, values);
      results.push(result);
    }
  } catch (err) {
    console.error(MESSAGES.DB_REQUEST_ERROR, err);
  } finally {
    client.end();
    return results;
  }
}

const invoke = async () => {

  /* TO CREATE TABLES
  await connectToDbAndInvoke([
    [DDL.CREATE_TABLE.PRODUCTS],
    [DDL.CREATE_TABLE.STOCKS]
  ]);
  */

  /* TO DROP TABLES
  await connectToDbAndInvoke([
    [DDL.DROP_TABLE.STOCKS],
    [DDL.DROP_TABLE.PRODUCTS]
  ]);
  */

  /* TO INSERT MOCK_DATA
  const products = await connectToDbAndInvoke([
    [DML.INSERT_PRODUCTS.TEXT, DML.INSERT_PRODUCTS.TEST_VALUES_1],
    [DML.INSERT_PRODUCTS.TEXT, DML.INSERT_PRODUCTS.TEST_VALUES_2]
  ]);
  const ids = products.map(product => product.rows[0].id);
  console.log('ids: ', ids);
  await connectToDbAndInvoke([
    [DML.INSERT_STOCKS.TEXT, [ids[0], 5]],
    [DML.INSERT_STOCKS.TEXT, [ids[1], 7]]
  ]);
  */
}

export {
  invoke
}
