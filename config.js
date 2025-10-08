require("dotenv").config();

module.exports = {
  SECRET_KEY: process.env.SECRET_KEY || "devsecret", // backup option
};