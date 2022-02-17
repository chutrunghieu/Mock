var express = require("express");
var router = express.Router();
var auth = require('../middleware/authorization');
const user = require('../controllers/userC');
const passport = require('passport');


router.get('/', (req, res) => {
  res.send('ok')
});

router.post('/submit/:user_id',auth.auth('user'), user.submit);

router.get('/getQuestion',auth.auth('user'), user.getQuestion);
router.get('/getScore/:user_id',auth.auth('user'), user.getScore);

router.put('/updateUser', auth.auth('user'), user.updateUser);
router.put('/changePassword', auth.auth('user'), user.changePassword);
module.exports = router;