///all our routes are stored here

var express = require('express');
var router = express.Router();
const {handleLogin} = require('../middleware/login');
const {handleSignup} = require('../middleware/signup');
var connection = require('../middleware/database').databaseConnection;
var fs = require("fs");



//Get home page
router.get('/',  (req, res) => {
    res.render('home'); //render willl look into a views folder
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', handleLogin);

router.get('/home',(req,res) =>{
    res.render('home');

});

router.get('/signup', (req, res) =>{
    res.render('signup');
})

router.post('/signup',handleSignup);


router.get('/listing',(req,res) => {
    const sql = 'SELECT * from fish_inventory';
    connection.query(sql,(err,rows) => {
        if(err){
            console.error('Error executing query: ', err);
            return;
        }
        res.render('listing',{fishInventory : rows});
    });

});

router.get('/prod_page',(req,res) => {
    res.render('prod_page');

});
///trying to figure out why images wont load
router.get('/image',(req,res) =>{
    res.render('imageTest');
});



//check data is being accessible 
router.get('/data', (req, res) => {

    let sql = 'SELECT * FROM users';
    
    connection.query(sql, (err, result) => {
    
    if (err) throw err;
    
    console.log(result);
    
    res.send('users received');
    
    });
    
    });

module.exports = router;