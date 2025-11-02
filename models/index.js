import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';
import { fileURLToPath } from 'url';
import config from '../config/config.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const db = {};

const cfg = config[env] || config;

if (!cfg.dialect && !cfg.use_env_variable) {
  throw new Error('Sequelize config must specify "dialect" for ESM models/index.js');
}

let sequelize;
if (cfg.use_env_variable) {
  sequelize = new Sequelize(process.env[cfg.use_env_variable], cfg);
} else {
  sequelize = new Sequelize(cfg.database, cfg.username, cfg.password, cfg);
}

const files = fs.readdirSync(__dirname).filter(file =>
  file.indexOf('.') !== 0 &&
  file !== basename &&
  file.slice(-3) === '.js' &&
  file.indexOf('.test.js') === -1
);

for (const file of files) {
  const fullPath = path.join(__dirname, file);
  const mod = await import(fullPath);
  const modelFactory = mod.default;
  if (typeof modelFactory === 'function') {
    const model = modelFactory(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  }
}

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export const sequelizeInstance = db.sequelize;
export const SequelizeLib = Sequelize;
export const User = db.User;
export const Role = db.Role;
export const Product = db.Product;

export default db;