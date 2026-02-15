import dotenv from "dotenv";

dotenv.config();

export default {
  development: {
    username: process.env.PGUSER,
    email: process.env.PGEMAIL,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: "postgres",
  },
  test: {
    username: process.env.PGUSER,
    email: process.env.PGEMAIL,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE_TEST,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: "postgres",
  },
  production: {
    username: process.env.PGUSER,
    email: process.env.PGEMAIL,
    password: process.env.PGPASSWORD,
    database: process.env.PGDATABASE,
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    dialect: "postgres",
  },
};
