import fs from "fs";
import path from "path";
import process from "process";

import { DataTypes } from "sequelize";
import { fileURLToPath } from "url";
import { Sequelize } from "sequelize-typescript";

import { User } from "./user.js";
import { Role } from "./role.js";
import { Product } from "./product.js";
import config from "../config/config.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

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

const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1,
  );

for (const file of files) {
  const fullPath = path.join(__dirname, file);
  const mod = await import(fullPath);
  const modelFactory = mod.default;
  if (typeof modelFactory === "function") {
    const model = modelFactory(sequelize, DataTypes);
    db[model.name] = model;
  }
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export { sequelize, User, Role, Product };
export const sequelizeInstance = db.sequelize;
export const SequelizeLib = Sequelize;

export default db;
