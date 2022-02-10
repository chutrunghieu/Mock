const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const question = require("./questionModel");
const user = require('./userModel');

const userAnswer = db.define("userAnswer", {
  user_answer_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  question_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  answerOfUser:{
    type: DataTypes.STRING,
  }
});


module.exports = userAnswer;
