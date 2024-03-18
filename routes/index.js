///all our routes are stored here

var express = require('express');
var router = express.Router();
const {handleLogin} = require('../middleware/login');
const {handleSignup} = require('../middleware/signup');
var connection = require('../middleware/database').databaseConnection;


//Get home page
router.get('/',  (req, res) => {
    res.render('home'); //render willl look into a views folder
});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', handleLogin);


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