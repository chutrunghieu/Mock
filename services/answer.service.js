const wrongAnswers = require("../models/wrongAnswerModel");
const correctAnswers = require("../models/correctAnswerModel");
const { Op } = require("sequelize");


//Correct Answer
exports.getCorrectAnswer = async (id) => {
  try {
    return (getCorrectAnswers = await correctAnswers.findAll({
      where: { question_id: id },
    }));
  } catch (error) {
    console.log(error);
  }
};
exports.createCorrectAnswer = async (content, question_id) => {
  try {
    const newCA = await correctAnswers.create({
      content: content,
      question_id: question_id,
    });
    return newCA;
  } catch (error) {
    console.log(error);
  }
};

exports.getCorrectAnswerId = async (id) => {
  try {
    const getCorrectAnswerId = await correctAnswers.findOne({
      where: { correct_answers_id: id },
    });
    return getCorrectAnswerId;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteCorrectAnswer = async (id) => {
  try {
      const deleteCorrectAnswer = await correctAnswers.destroy({
        where: {
          [Op.or]: [
            { correct_answers_id: id },
            { question_id: id },
          ],
        },
      });
      return deleteCorrectAnswer;
  } catch (error) {
    console.log(error);
  }
};
//Wrong Answer
exports.getWrongAnswer = async (id) => {
  try {
    return (getWrongAnswers = await wrongAnswers.findAll({
      where: { question_id: id },
    }));
  } catch (error) {
    console.log(error);
  }
};

exports.createWrongAnswer = async (content, question_id) => {
  try {
    const newWA = await wrongAnswers.create({
      content: content,
      question_id: question_id,
    });
    return newWA;
  } catch (error) {
    console.log(error);
  }
};


exports.getWrongAnswerId = async (id) => {
  try {
    const getCorrectAnswerId = await correctAnswers.findOne({
      where: { correct_answers_id: id },
    });
    return getCorrectAnswerId;
  } catch (error) {
    console.log(error);
  }
};
exports.deleteWrongAnswer = async (id) => {
  try {
      const deleteWrongAnswer = await correctAnswers.destroy({
        where: {
          [Op.or]: [
            { correct_answers_id: id},
            { question_id: id },
          ],
        },
      });
      return deleteWrongAnswer;
    
  } catch (error) {
    console.log(error);
  }
};

// module.exports = {
//   deleteWrongAnswer,
//   getWrongAnswerId,
//   getCorrectAnswerId,
//   deleteCorrectAnswer,
//   getWrongAnswer,
//   createCorrectAnswer,
//   createWrongAnswer,
//   getCorrectAnswer,
// };
