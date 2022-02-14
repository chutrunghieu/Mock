var express = require("express");
var router = express.Router();
var verify = require('../middleware/authorization');
var admin = require('../controllers/adminC');

router.post('/createQuestion',verify.authorization, admin.createQuestion);
router.post('/createCorrectAnswer',verify.authorization, admin.createCorrectAnswer);
router.post('/createWrongAnswer',verify.authorization, admin.createWrongAnswer);

router.get('/getAllQuestion',verify.authorization, admin.getQuestions);
router.get('/getDetailQuestion/:id',verify.authorization, admin.getDetailQuestion);

router.put('/updateQuestion',verify.authorization, admin.updateQuestion);

router.delete('/deleteQuestion',verify.authorization, admin.deleteQuestion);
router.delete('/deleteCorrectAnswer',verify.authorization, admin.deleteCorrectAnswer);
router.delete('/deleteWrongAnswer',verify.authorization, admin.deleteWrongAnswer);




module.exports = router;