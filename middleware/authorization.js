var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
var token = require("../models/tokenModel");
dotenv.config();

exports.authorization = function (res, req, next) {
  const header = req.headers["authorization"] || req.body.token;
  const token = header.split(" ")[1];
  if (!token) {
    res.sendStatus(401);
  }
  const aToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  if (aToken) {
    console.log(aToken);
    next();
  }
};

exports.refreshToken = async (req, res) => {
  const refreshToken = req.body.token;
  try {
    const check = await token.findOne({ where: { data_token: refreshToken } });
    if (check) {
      const data = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
      if (data) {
        const accessToken = jwt.sign(
          { email: data.email, role: data.role },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "60s" }
        );
        console.log(accessToken);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
