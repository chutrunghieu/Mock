const correctAnswers = require("../models/correctAnswerModel");
const question = require("../models/questionModel");
const wrongAnswers = require("../models/wrongAnswerModel");

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

exports.getDetailQuestion = async (res, req) => {
  const { id } = req.params.id;
  try {
    const getDetailQuestion = await question.findOne({ question_id: id });
    res.json(getDetailQuestion);
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
    const findQuestion = await question.findOne({ where: { question_id: question_id }});
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
    const findQuestion = await question.findOne({ where: { question_id: question_id } });
    const newWA = await wrongAnswers.create({
      content: content,
      question_id: findQuestion.question_id,
    });
    console.log(newWA);
  } catch (error) {
    console.log(error);
  }
};
