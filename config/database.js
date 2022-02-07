
const Sequelize = require('sequelize');

const db = new Sequelize('postgres', 'postgres', 'acevip123', {
    host: 'localhost',
    dialect: 'postgres'
  });
db.sync();
module.exports = db;