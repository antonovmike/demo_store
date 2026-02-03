import path from "path";
import process from "process";

import { fileURLToPath } from "url";
import { Sequelize } from "sequelize-typescript";

import { User } from "./user.js";
import { Role } from "./role.js";
import { Product } from "./product.js";
import config from "../config/config.js";

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.PGHOST,
  port: Number(process.env.PGPORT),
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  database: process.env.PGDATABASE,
  logging: false,
});

sequelize.addModels([User, Role, Product]);

interface DbMap {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const db: DbMap = {} as DbMap;

interface DbConfig {
  username?: string;
  password?: string;
  database?: string;
  host?: string;
  port?: string;
  dialect?: string;
  use_env_variable?: string;
}

type Env = "development" | "test" | "production";
const env = (process.env.NODE_ENV as Env) || "development";
const cfg: DbConfig = config[env] || config;

if (!cfg.dialect && !cfg.use_env_variable) {
  throw new Error(
    'Sequelize config must specify "dialect" for ESM models/index.js',
  );
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.User = User;
db.Role = Role;
db.Product = Product;

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize, User, Role, Product };
export const sequelizeInstance = db.sequelize;
export const SequelizeLib = Sequelize;

export default db;
