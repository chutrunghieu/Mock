const question = require("../models/questionModel");
const correctAnswers = require("../models/correctAnswerModel");
const wrongAnswers = require("../models/wrongAnswerModel");
const userService = require('../services/user.service');
const scores = require("../models/scoreModel");

exports.submit = async (req, res) => {
  const { answerOfUser } = req.body;
  const test = [];
  const comparator = function (a, b) {
    return a.question_id === b.question_id && a.content === b.content;
  };
  const user_id = 1;
  try {
    const correctAnswer = await correctAnswers.findAll({
      attributes: ["question_id", "content"],
    });
    correctAnswer.filter((item) => {
      test.push(item.dataValues);
    });
    const check = test.filter((a) =>
      answerOfUser.some((b) => comparator(a, b))
    );
    const score = check.length;

    const addScore = await userService.addScore(score, user_id);

    return res.json({ check });
  } catch (error) {
    console.log(error);
  }
};

exports.getScore = async (req,res) => {
    const user_id = 1;
    try {
        const getScore = await scores.findAll({where: {user_id:user_id},attributes: ["score"]})
        return res.json({ getScore });
    } catch (error) {
        console.log(error);
    }
}

exports.getQuestion = async (req, res) => {
  try {
    const questions = await question.findAll({
      order: [question.sequelize.random()],
      limit: 10,
      include: [
        {
          model: correctAnswers,
          association: "correctAnswers",
        },
        {
          model: wrongAnswers,
          association: "wrongAnswers",
        },
      ],
    });
    console.log(questions);
    return res.json({ questions });
  } catch (error) {
    console.log(error);
  }
};
