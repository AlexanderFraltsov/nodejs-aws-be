const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const MESSAGES = {
  CONNECTION_ERROR: 'Connection error',
  CONNECTION_OK: 'DB connected',
  DB_REQUEST_ERROR: 'Error during database request executing:'
}

const CONNECTION_TIMEOUT_MS = 5000;

const DB_OPTIONS = {
  host: PG_HOST,
  port: +PG_PORT,
  database: PG_DATABASE,
  user: PG_USERNAME,
  password: PG_PASSWORD,
  ssl: {
    rejectUnauthorized: false
  },
  connectionTimeoutMillis: CONNECTION_TIMEOUT_MS
};

export {
  MESSAGES,
  DB_OPTIONS
}
