const scores = require("../models/scoreModel");
const user = require("../models/userModel");


exports.findUser = async (email) =>{
    try {
        const findUser = await user.findOne({where:{email: email}});
        return findUser;
    } catch (error) {
        console.log(error);
    }
}

exports.addScore = async (user_id,score) =>{
    try {
        const addScore = await scores.create({score:score,user_id:user_id})
        return addScore;
    } catch (error) {
        console.log(error);
    }
}