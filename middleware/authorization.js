var jwt = require("jsonwebtoken");
var dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");

// exports.authorization = function (req, res, next) {
//   const header = req.headers["authorization"];
//   const token = header.split(" ")[1];
//   if (!token) {
//     res.sendStatus(401);
//   }
//   const aToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
//   if (aToken) {
//     req.userId = aToken.user_id;
//     next();
//   }
// };

const verifyCallback =
  (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
      return reject("Please authenticate");
    }
    req.user = user;
    if (!requiredRights || requiredRights !== user.role.toLowerCase()) {
      return reject("Forbidden");
    } else {
      resolve();
    }
  };
exports.auth = (requiredRights) => async (req, res, next) => {
  return new Promise((resolve, reject) => {
    passport.authenticate(
      "jwt",
      { session: false },
      verifyCallback(req, resolve, reject, requiredRights)
    )(req, res, next);
  })
    .then(() => next())
    .catch((err) => next(err));
};
