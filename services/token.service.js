var token = require("../models/tokenModel");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config();

exports.signAccessToken = async (user_id, role) =>{
    try {
        const accessToken = jwt.sign(
            { user_id: user_id, role: role },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "60s" }
          );   
          return accessToken;
    } catch (error) {
        console.log(error);
    };
};
exports.signRefreshToken = async (user_id,role)=>{
    try {
        const refreshToken = jwt.sign(
            { user_id: user_id, role: role },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: "86400s" }
          );
        return refreshToken;
    } catch (error) {
        console.log(error);
    };
};
exports.verifyToken = async (refreshToken) =>{
    try {
        const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        return data;
    } catch (error) {
        console.log(error)
    }
}
exports.findToken = async(refreshToken) =>{
    try {
        const findToken = await token.findOne({ data_token: refreshToken });
        return findToken;
    } catch (error) {
        console.log(error);
    }
}
exports.createToken = async(refreshToken, user_id)=>{
    try {
        const newToken = await token.create({ data_token: refreshToken, user_id: user_id});
        return newToken;
    } catch (error) {
        console.log(error);
    }
}
exports.destroyToken = async (refreshToken) =>{
    try {
        const destroyToken = await token.destroy({where: {data_token: refreshToken}});
        return destroyToken;
    } catch (error) {
        console.log(error)
    }
}
exports.updateToken = async (newRefreshToken, token_id) =>{
    try {
        const updateToken = await token.update({data_token: newRefreshToken},{where:{token_id:token_id}});
        return updateToken;
    } catch (error) {
        console.log(error)
    }
}