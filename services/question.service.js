const correctAnswers = require("../models/correctAnswerModel");
const question = require("../models/questionModel");
const wrongAnswers = require("../models/wrongAnswerModel");

exports.getCorrectAnswer = async (id) =>{
    try {
      return getCorrectAnswers = await correctAnswers.findAll({where: {question_id: id}});
    } catch (error) {
      console.log(error )
    }
  };
  
  exports.getWrongAnswer = async (id) =>{
    try {
      return getWrongAnswers = await wrongAnswers.findAll({where: {question_id: id}});
    } catch (error) {
      console.log(error )
    }
  };

exports.findQuestionById = async (id) =>{
    try {
        return getDetailQuestion = await question.findOne({where: { question_id: id }});
    } catch (error) {
        console.log(error)
    }
}

