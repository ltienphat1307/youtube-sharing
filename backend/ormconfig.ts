module.exports = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  logger: "advanced-console",
  logging: ["error", "warn"],
  cache: true,
  dropSchema: false,
  entities: ["dist/models/*.js"],
  migrationsTableName: "migration_table",
  migrations: ["dist/migrations/*.js"],
  cli: {
    migrationsDir: "src/migrations",
  },
};
