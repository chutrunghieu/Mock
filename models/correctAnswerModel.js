const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const question = require("./questionModel");
const correctAnswers = db.define("correctAnswers", {
  correct_answers_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  content: {
    type: DataTypes.TEXT,
    unique: {
      args: true,
      msg: "Answer already in use!",
    },
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = correctAnswers;
