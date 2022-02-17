var bcrypt = require("bcrypt");
var dotenv = require("dotenv");
var jwt = require("jsonwebtoken");

dotenv.config();
const {userService, tokenService} = require('../services/index');

exports.signUp = async (req, res, next) => {
  const { email, password, pwd2, name, phone } = req.body;
  try {
    const checkUser = await userService.findUser(email);
    if (checkUser) {
      return console.log("email is exist!");
    }
    if (password != pwd2) {
      return console.log("Confirm password is wrong!");
    } else {
      const newUser = await userService.createUser(email, password,name, phone);
      return res.status(200).json({msg:"Success",newUser});
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (req, res, next) => {
  const { email, pwd } = req.body;
  try {
    const checkUser = await userService.findUser(email);
    if (!checkUser) {
      return console.log("User is not found!");
    } else {
      const same = await bcrypt.compare(pwd, checkUser.password);
      if (same) {
        const accessToken = await tokenService.signAccessToken(checkUser.user_id,checkUser.role);
        const refreshToken = await tokenService.signRefreshToken(checkUser.user_id,checkUser.role);
        const checkToken = await tokenService.findToken(refreshToken);
        if (!checkToken) {
          const newToken = await tokenService.createToken(refreshToken, checkUser.user_id);
        }
        if (checkUser.role === "user"){
          console.log("user home");
        }
        if (checkUser.role === "admin"){
          console.log("admin home");
        }
        return res.status(200).json({msg:"Success",accessToken,refreshToken});
      } else {
        const msg = "Username or Password is incorrect !";
        return console.log(msg);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (req, res) =>{
  const {refreshToken} = req.body;
  try {
    const checkToken = await tokenService.findToken(refreshToken);
    if(checkToken){
      const destroyToken= await tokenService.destroyToken(refreshToken);
      return res.status(200).json({msg:"Success",destroyToken});
    }
  } catch (error) {
    console.log(error)
  }
}
exports.refreshToken = async (req, res) => {
  const {refreshToken} = req.body;
  try {
    const check = await tokenService.findToken(refreshToken);
    if (check) {
      const data = await tokenService.verifyToken(refreshToken);
      console.log(data)
      if (data) {
        const accessToken = await tokenService.signAccessToken(data.user_id,data.role);
        const newRefreshToken = await tokenService.signRefreshToken(data.user_id,data.role);
        const updateRefreshToken = await tokenService.updateToken(newRefreshToken, check.token_id);
        return res.status(200).json({msg:"Success",accessToken,newRefreshToken,updateRefreshToken});
      }
    }
  } catch (error) {
    console.log(error);
  }
};
