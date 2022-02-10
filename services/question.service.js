const question = require("../models/questionModel");

exports.findQuestionById = async (id) =>{
    try {
        return getDetailQuestion = await question.findOne({where: { question_id: id }});
    } catch (error) {
        console.log(error)
    }
}

exports.createQuestion = async (content) => {
  try {
    const newQuestion = await question.create({
      content: content,
    });
    return newQuestion;
  } catch (error) {
    console.log(error);
  }
};

exports.deleteQuestion = async (id) =>{
  try {
      const deleteQuestion = await question.destroy({where: {question_id: id}});
      return deleteQuestion;
  } catch (error) {
    console.log(error);
  }
}

exports.updateQuestion = async (id , content) =>{
  try {
    const updateQuestion = await question.update({content: content}, {where:{question_id:id}});
    return updateQuestion;
  } catch (error) {
    console.log(error);
  }
}
// module.exports = {
//   findQuestionById,
//   createQuestion,
//   deleteQuestion,
// }
