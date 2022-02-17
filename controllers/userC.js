const question = require("../models/questionModel");
const correctAnswers = require("../models/correctAnswerModel");
const wrongAnswers = require("../models/wrongAnswerModel");
const {userService} = require('../services/index');
const scores = require("../models/scoreModel");

exports.submit = async (req, res) => {
  const { user_id } = req.params.id;
  const { answerOfUser } = req.body;
  const correctAnswerArray = [];
  const compare = function (a, b) {
    return a.question_id === b.question_id && a.content === b.content;
  };
  try {
    const correctAnswer = await correctAnswers.findAll({
      attributes: ["question_id", "content"],
    });
    correctAnswer.filter((item) => {
      correctAnswerArray.push(item.dataValues);
    });
    const check = correctAnswerArray.filter((a) =>
      answerOfUser.some((b) => compare(a, b))
    );
    const score = check.length;

    const addScore = await userService.addScore(score, user_id);

    return res.json({ check });
  } catch (error) {
    console.log(error);
  }
};

exports.getScore = async (req,res) => {
    const {user_id} = req.params.id;
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
          attributes: ["question_id", "content"],
        },
        {
          model: wrongAnswers,
          association: "wrongAnswers",
          attributes: ["question_id", "content"],
        },
      ],
    });
    return res.json({ questions });
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async(req, res) =>{
  const {email, name, phone} = req.body;
  const user_id = req.params.id;
  try {
    const updateUser = await userService.updateUser(email, name, phone, user_id);
    return res.json({updateUser});
  } catch (error) {
    console.log(error);
  }
}

exports.changePassword = async (req, res) =>{
  const { oldPassword, newPassword, newPassword2 } = req.body;
  const user_id = req.params.id;
  try {
    const changePassword = await userService.changePassword(oldPassword, newPassword, newPassword2, user_id);
    return res.json({changePassword});
  } catch (error) {
    console.log(error);
  }
};
      