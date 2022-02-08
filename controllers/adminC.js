const correctAnswers = require("../models/correctAnswerModel");
const question = require("../models/questionModel");
const wrongAnswers = require("../models/wrongAnswerModel");
const questionService = require("../services/question.service");

exports.createQuestion = async (res, req) => {
  data = {
    content: "trai dat hinh gi?",
  };
  const { content } = data || req.body;
  try {
    const newQuestion = await question.create({
      content: content,
    });
    console.log(newQuestion);
  } catch (error) {
    console.log(error);
  }
};

exports.getQuestions = async (req, res) =>{
  try {
    const getQuestions = await question.findAll();
    return res.json({getQuestions});
  } catch (error) {
    console.log(error);
  }
};

exports.getDetailQuestion = async (res, req) => {
  const { id } = req.params.id;
  try {
    const getDetailQuestion = await questionService.findQuestionById(id);
    const getCorrectAnswers = await questionService.getCorrectAnswer(id);
    const getWrongAnswers = await questionService.getWrongAnswer(id);
    return res.json({getDetailQuestion},{getCorrectAnswers},{getWrongAnswers});
  } catch (error) {
    console.log(error);
  }
};


exports.createCorrectAnswer = async (res, req) => {
  data = {
    content: "hinh cau",
    question_id: 1,
  };
  const { content, question_id } = data || req.body;
  try {
    const findQuestion = await questionService.findQuestionById(question_id);
    const newCA = await correctAnswers.create({
      content: content,
      question_id: findQuestion.question_id,
    });
    console.log(newCA);
  } catch (error) {
    console.log(error);
  }
};

exports.createWrongAnswer = async (res, req) => {
  data = {
    content: "hinh tam giac",
    question_id: 1,
  };
  const { content, question_id } = data || req.body;
  try {
    const findQuestion = await questionService.findQuestionById(question_id);
    const newWA = await wrongAnswers.create({
      content: content,
      question_id: findQuestion.question_id,
    });
    console.log(newWA);
  } catch (error) {
    console.log(error);
  }
};
