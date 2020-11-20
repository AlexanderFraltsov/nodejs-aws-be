import { Client } from 'pg';
import { DB_OPTIONS } from './constants';
import { dbConnectCallback } from './db-connect-cb';

export const createClient = async () => {
  const client = new Client(DB_OPTIONS);
  client.connect(dbConnectCallback);

  return client;
}
