const { Sequelize, DataTypes } = require("sequelize");
const db = require("../config/database");
const wrongAnswers = require('../models/wrongAnswerModel');
const correctAnswers = require('../models/correctAnswerModel');
const question = db.define("question", {
    question_id: {
        type:DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
    },
  content: {
    type: DataTypes.TEXT,
    unique: {
      args: true,
      msg: 'Question already in use!',
      },
  },
  // user_id: {
  //   type:DataTypes.INTEGER,
  //       allowNull: false,
  // }
});

// question.hasMany(userAnswer, {
//   targetKey: 'question_id',
//   foreignKey: "question_id",
// });
question.hasMany(correctAnswers, {
  targetKey: 'question_id',
  foreignKey: "question_id",
});
question.hasMany(wrongAnswers, {
  targetKey: 'question_id',
  foreignKey: "question_id",
});
module.exports = question;
