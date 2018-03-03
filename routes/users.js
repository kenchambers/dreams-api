var express = require('express');
var router = express.Router();
const store = require('../store');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/createUser', (req, res) => {
  store
    .createUser({
      email: req.body.email,
      password: req.body.password
    })
    .then(() => res.sendStatus(200))
})

module.exports = router;
