const scores = require("../models/scoreModel");
const user = require("../models/userModel");
var bcrypt = require("bcrypt");

exports.findUser = async (email) =>{
    try {
        const findUser = await user.findOne({where:{email: email}});
        return findUser;
    } catch (error) {
        console.log(error);
    }
}

exports.addScore = async (score, user_id) =>{
    try {
        const addScore = await scores.create({score:score,user_id:user_id})
        return addScore;
    } catch (error) {
        console.log(error);
    }
}

exports.createUser = async(email, password, name, phone)=>{
    try {
        const newUser = await user.create({
            email: email,
            password: bcrypt.hashSync(password, bcrypt.genSaltSync(8), null),
            name: name,
            phone: phone,
          });
        return newUser;
    } catch (error) {
        console.log(error);
    }
}

exports.updateUser = async(email, name, phone,user_id) =>{
    try {
        const updateUser = await user.update({
            email: email,
            name: name,
            phone: phone,
          },{where: {user_id:user_id}});
        return updateUser;
    } catch (error) {
        console.log(error);
    }
}

exports.changePassword = async(oldPassword, newPassword, newPassword2,user_id ) =>{
    try {
        const changePassword = bcrypt.compare(oldPassword, user.password, async (err, same) => {
            if (same) {
              if (user == newPassword) {
                console.log("Same old password");
              } else if (newPassword.length < 4) {
                console.log("Password must be at least 4 characters !!!");
              } else if (newPassword != newPassword2) {
                console.log("Confirm password wrong !");
              } else {
                await user.update(
                  {password: newPassword},{where:{user_id: user_id}}
                );
                console.log("Change Password Success !");
              }
            } else {
                console.log("Wrong Current Password !");
            }
          });
        return changePassword;
    } catch (error) {
        console.log(error)
    }
}