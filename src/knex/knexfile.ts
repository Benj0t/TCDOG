import path from 'path';
import { fileURLToPath } from 'url';

import * as dotenv from 'dotenv';
import type { Knex } from 'knex';

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const absPath = path.resolve(currentDirectory, '..', '..', '.env');

dotenv.config({ path: absPath });

const config: Knex.Config = {
  client: 'mysql2',
  connection: {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

export default config;
