var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config();

exports.authorization = function (req, res, next) {
  const header = req.headers["authorization"];
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

