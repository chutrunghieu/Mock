var express = require("express");
var router = express.Router();
var auth = require('../controllers/systemC');

router.post("/signup", auth.signUp);
router.post('/login', auth.login);
router.post('/logout', auth.logout);
router.post('/refreshToken', auth.refreshToken);

module.exports = router;