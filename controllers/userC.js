const question = require('../models/questionModel');
const correctAnswers = require('../models/correctAnswerModel');
const wrongAnswers = require('../models/wrongAnswerModel');

exports.submit = (req, res) =>{
    
};

exports.getQuestion = async (req, res) =>{
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
                }
            ],
        })
        return res.json({questions});
    } catch (error) {
            console.log(error);
    } 
};