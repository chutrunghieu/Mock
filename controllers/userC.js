const question = require('../models/questionModel');

exports.submit = (req, res) =>{
    
};

exports.getQuestion = (req, res) =>{
    try {
        // const questions = question.findAll({
        //     order: 'random()',
        //     limit: 10,
        //     include: [
        //         {    
        //             model: correctAnswers,
        //             where:{
        //                 question_id = Sequelize.col('question.question_id')
        //             },
        //             association: "correctAnswers",
        //             attributes: ["content"]
        //         },
        //         {
        //             association: "correctAnswers",
        //             where:{
        //                 question_id = Sequelize.col('question.question_id')
        //             },
        //             association: "correctAnswers",
        //             attributes: ["content"]
        //         }
        //     ],
        // })
        // console.log(questions.correctAnswers.content);
    } catch (error) {
            console.log(error);
    }
};