var user = require("../models/userModel");
var token = require("../models/tokenModel");
var bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config();

exports.signUp = async (req, res, next) => {
  data = {
    email: "abc@gmal.com",
    pwd: "abc123",
    pwd2: "abc123",
    name: "hieu",
    phone: 12345567,
  };
  const { email, pwd, pwd2, name, phone } = data || req.body;
  try {
    const checkUser = await user.findOne({
      where: {
        email: email,
      },
    });
    if (checkUser) {
      return console.log("email is exist!");
    }
    if (pwd != pwd2) {
      return console.log("Confirm password is wrong!");
    } else {
      const newUser = await user.create({
        email: email,
        password: bcrypt.hashSync(pwd, bcrypt.genSaltSync(8), null),
        name: name,
        phone: phone,
      });
      return console.log(newUser);
    }
  } catch (error) {
    console.log(error);
  }
};

exports.login = async (res, req, next) => {
  data = {
    email: "abc@gmal.com",
    pwd: "abc123",
  };
  const { email, pwd } = data || req.body;
  try {
    const checkUser = await user.findOne({
      where: {
        email: email,
      },
    });
    if (!checkUser) {
      return console.log("User is not found!");
    } else {
      const same = bcrypt.compare(checkUser.password, pwd);
      if (same) {
        const accessToken = jwt.sign(
          { email: email, role: checkUser.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "60s" }
        );
        const refreshToken = jwt.sign(
          { email: email, role: checkUser.role },
          process.env.REFRESH_TOKEN_SECRET,
          { expiresIn: "86400s" }
        );
        const checkToken = await token.findOne({ data_token: refreshToken });
        if (!checkToken) {
          const newToken = await token.create({ data_token: refreshToken, user_id: checkUser.user_id});
          console.log(newToken);
        }
        console.log(accessToken);
        if (checkUser.role = "user"){
          console.log("user home");
        }
        if (checkUser.role = "admin"){
          console.log("admin home");
        }
      } else {
        const msg = "Username or Password is incorrect !";
        return console.log(msg);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

exports.logout = async (res, req) =>{
  const refreshToken = req.body.token;
  try {
    const checkToken = await token.findOne({ data_token: refreshToken });
    if(checkToken){
      await token.destroy({where: {data_token: refreshToken}});
      console.log('Logout successfully!');
    }
  } catch (error) {
    console.log(error)
  }
}
