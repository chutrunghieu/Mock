var express = require("express");
var router = express.Router();
var verify = require('../middleware/authorization');
const user = require('../controllers/userC');

router.get('/', (req, res) => {
  res.send('ok')
});

router.post('/submit', user.submit);

router.get('/getQuestion', user.getQuestion);
  
module.exports = router;