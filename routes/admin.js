var express = require("express");
var router = express.Router();
var auth = require('../middleware/authorization');
var admin = require('../controllers/adminC');

router.post('/createQuestion',auth.auth('admin'), admin.createQuestion);
router.post('/createCorrectAnswer',auth.auth('admin'), admin.createCorrectAnswer);
router.post('/createWrongAnswer',auth.auth('admin'), admin.createWrongAnswer);

router.get('/getAllQuestion',auth.auth('admin'), admin.getQuestions);
router.get('/getDetailQuestion/:id', admin.getDetailQuestion);

router.put('/updateQuestion',auth.auth('admin'), admin.updateQuestion);

router.delete('/deleteQuestion',auth.auth('admin'), admin.deleteQuestion);
router.delete('/deleteCorrectAnswer',auth.auth('admin'), admin.deleteCorrectAnswer);
router.delete('/deleteWrongAnswer',auth.auth('admin'), admin.deleteWrongAnswer);




module.exports = router;