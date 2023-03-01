require("dotenv").config();

const CONNECTION_STRING =
  "postgresql://Sapphirestream:v2_3zege_g2WQ4TXhrvMChJPSbHyaeh2@db.bit.io:5432/Sapphirestream/unit-4";

//^ IF THE .ENV WORKS
// const {CONNECTION_STRING} = process.env;

const Sequelize = require("sequelize");

const sequelize = new Sequelize(CONNECTION_STRING, {
  dialect: "postgres",
  dialectOptions: { ssl: { rejectUnauthorized: false } },
});

module.exports = sequelize;
