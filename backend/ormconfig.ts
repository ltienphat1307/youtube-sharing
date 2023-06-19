module.exports = {
  type: "mysql",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logger: "advanced-console",
  logging: process.env.NODE_ENV === "production" ? ["error", "warn"] : "all",
  cache: true,
  dropSchema: false,
  entities: ["dist/models/*.js"],
};
