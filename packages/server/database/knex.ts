import knex, { MigratorConfig, Config } from 'knex';

const migrations: MigratorConfig = {
  extension: 'ts',
  directory: './database/migrations',
  tableName: 'knex_migrations',
};

export const knexConfig: Config & {
  [key: string]: Config;
} = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.sqlite3',
    },
    migrations,
    asyncStackTraces: true,
  },

  production: {
    client: 'postgresql',
    connection: {
      database: 'anonytics',
      user: 'username',
      password: 'password',
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations,
  },
  test: {},
};

const environment = process.env.NODE_ENV || ('development' as const);

export const database = knex(knexConfig[environment]);
