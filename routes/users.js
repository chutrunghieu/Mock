var express = require("express");
var router = express.Router();
var verify = require('../middleware/authorization');
const user = require('../controllers/userC');

router.get('/', (req, res) => {
  res.send('ok')
});

router.post('/submit',verify.authorization, user.submit);

router.get('/getQuestion',verify.authorization, user.getQuestion);
router.get('/getScore',verify.authorization, user.getScore);
  
module.exports = router;