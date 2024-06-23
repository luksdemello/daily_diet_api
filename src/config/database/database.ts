import knex, { Knex } from "knex";
import { env } from "../env/index.js";

export const knexConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: env.DB_HOST,
    port: env.DB_PORT,
    user: env.DB_USER,
    database: env.DB_NAME,
    password: env.DB_PASSWORD,
  },
  migrations: {
    extension: "ts",
    directory: "./src/config/database/migrations",
  },
};

export const knexDb: Knex = knex(knexConfig);
