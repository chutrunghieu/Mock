var express = require("express");
var router = express.Router();
var verify = require('../middleware/authorization');
var admin = require('../controllers/adminC');

router.post('/createQuestion', admin.createQuestion);
router.post('/createCorrectAnswer', admin.createCorrectAnswer);
router.post('/createWrongAnswer', admin.createWrongAnswer);
router.get('/getDetailQuestion/:id', admin.getDetailQuestion);

module.exports = router;