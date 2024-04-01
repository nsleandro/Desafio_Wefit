import { DataSource, DataSourceOptions } from "typeorm";

require("custom-env").env(true);

export const configuration: DataSourceOptions  = {
  type: <"mysql" | "mariadb" | undefined>process.env.DB_DIALECT || 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306') || 3306,
  username: process.env.MYSQLDB_USER,
  password: process.env.MYSQLDB_PASSWORD,
  database: process.env.MYSQLDB_DATABASE,
  migrationsTableName: "migration",
  migrations: [
    __dirname + "/./src/database/migrations/**/*.{js,ts}",

  ],
  entities: [
    __dirname + "/./src/entities/**/*.{js,ts}"
  ],
  connectTimeout: parseInt(process.env.DB_TIMEOUT || '1000000'),
  logging: process.env.NODE_ENV == 'development' ? ["error", "warn", /*"info", "log",*/ "migration"] : ["error", "warn", "migration"],
  migrationsRun: process.env.DB_MIGRATIONS_RUN === 'true' ? true : false,
  synchronize: false,
  cache: false,
  charset: 'utf8mb4',
  timezone: 'Z'
}

export default new DataSource(configuration)

