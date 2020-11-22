import { COMMON_PATH } from '../../common/constants';

const DDL = {
  CREATE_UUID: `CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`,
  CREATE_TABLE: {
    PRODUCTS: `
      create table if not exists products (
        id uuid DEFAULT uuid_generate_v4 (),
        title TEXT NOT NULL,
        description TEXT,
        price INTEGER,
        image TEXT,
        PRIMARY KEY (id)
    )`,
    STOCKS: `
      create table if not exists stocks (
        product_id uuid,
        count INTEGER,
        foreign key ("product_id") references "products" ("id")
    )`
  },
  DROP_TABLE: {
    PRODUCTS: `drop table if exists products`,
    STOCKS: `drop table if exists stocks`
  }
}

const DML = {
  INSERT_PRODUCTS: {
    TEXT: `INSERT INTO products(title, description, price, image)
      VALUES($1, $2, $3, $4) RETURNING *
    `,
    TEST_VALUES_1: [
      'CHAYA Lifestyle Melrose Elite Love is Love',
      'Retro Skates & Disco Roller',
      160,
      `${COMMON_PATH}1591/product_1591_5f9058d0760b7_medium.jpg`
    ],
    TEST_VALUES_2: [
      'RIEDELL Torch Neo',
      'Roller derby skates',
      625,
      `${COMMON_PATH}1269/product_1269_5a3a6e1e95fd2_medium.jpg`
    ]
  },
  INSERT_STOCKS: {
    TEXT: `INSERT INTO stocks(product_id, count)
      VALUES($1, $2) RETURNING *
    `
  },
  SELECT_ALL: {
    TEXT: `
      SELECT p.id, p.description, p.price, p.title, p.image, s.count
      FROM products p
      LEFT JOIN stocks s
      ON p.id=s.product_id
    `
  },
  SELECT_ONE: {
    TEXT: `
      SELECT p.id, p.description, p.price, p.title, p.image, s.count
      FROM products p
      LEFT JOIN stocks s
      ON p.id=s.product_id
      WHERE p.id=$1
    `
  }
}

export {
  DDL,
  DML
}
