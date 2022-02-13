const { Sequelize, DataTypes } = require("sequelize");
const db = require('../config/database');
const score = require('../models/scoreModel');

const user = db.define("user", {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  email: {
    type: DataTypes.TEXT,
    unique: {
      args: true,
      msg: 'Username already in use!',
      },
  },
  password: {
    type: DataTypes.TEXT,
  },
  name: {
    type: DataTypes.TEXT,
  },
  phone: {
    type: DataTypes.INTEGER,
  },
  role: {
    type: DataTypes.ENUM(["user", "admin"]),
    defaultValue: "user",
  },
});


// user.hasMany(userAnswer, {
//   targetKey: 'user_id',
//   foreignKey: "user_id",
// });

user.hasMany(score, {
  targetKey: 'user_id',
  foreignKey: 'user_id',
});


module.exports = user;

