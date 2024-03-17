///all our routes are stored here

var express = require('express');
var router = express.Router();
const { handleLogin,validateForm} = require('../middleware/login');



//Get home page
router.get('/',  (req, res) => {
    res.render('home'); //render willl look into a views folder
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', handleLogin);



module.exports = router;