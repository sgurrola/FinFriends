///all our routes are stored here

var express = require('express');
var router = express.Router();
const {handleLogin} = require('../middleware/login');
const {handleSignup} = require('../middleware/signup');
const {addToDatabase} = require('../middleware/prodpage');
var connection = require('../middleware/database').databaseConnection;
var fs = require("fs");
const {createOrder} = require('../middleware/database');



//Get home page
router.get('/',  (req, res) => {
    res.render('home',{isLoggedIn:false}); //render willl look into a views folder
    console.log({isLoggedIn: false});

});

router.get('/login', (req, res) => {
    res.render('login');
});

router.post('/login', handleLogin);

router.get('/home',(req,res) =>{
    const status = req.query.LoggedStatus;
    const isLoggedIn = status === 'true';
    const user = req.query.User;

    res.render('home',{isLoggedIn:isLoggedIn, username:user});
    console.log({isLoggedIn: isLoggedIn,username: user});


});

router.get('/signup', (req, res) =>{
    res.render('signup');
})

router.post('/signup',handleSignup);

router.post('/add-to-cart',(req,res) =>{
    const username = req.body.username;
    const fishname = req.body.fish_name;
    const fishPrice = req.body.price;

    addToDatabase(username,fishname,'fish_inventory',fishPrice);
    res.redirect('back');

});

router.post('/go-to-checkout',(req,res) =>{
    const username = req.body.username;
    const sub = req.body.subtotal;
   

    console.log({user: username,cartSubtotal: sub});
    res.render('checkout',{username:username, cartSubtotal: sub});


});

router.post('/confirm-order',(req,res)=>{
    const username = req.body.username;
    const sub = req.body.subtotal;

    createOrder(username,sub,(err,result) =>{
        if(err){
            console.error('error creating order', err);
        }
        if(result){
            console.log('Order Created');
            res.json({ message: 'ORDER IS ON THE WAY!!!', username: username });

        }
    });


});

router.get('/listing',(req,res) => {
    const sql = 'SELECT * from fish_inventory';
    const status = req.query.LoggedStatus;
    const isLoggedIn = status === 'true';
    const user = req.query.User;
    connection.query(sql,(err,rows) => {
        if(err){
            console.error('Error executing query: ', err);
            return;
        }
        res.render('listing', { isLoggedIn: isLoggedIn, fishInventory: rows ,username:user });
        console.log({isLoggedIn: isLoggedIn, username:user});


    });

});
router.get('/cart',(req,res)=>{
    const status = req.query.LoggedStatus;
    const isLoggedIn = status === 'true';
    const user = req.query.User;
    const sql = 'SELECT * from user_cart where username = ?';
    connection.query(sql,[user],(err,rows) => {
        if(err){
            console.error('Error executing query: ', err);
            return;
        }
        res.render('cart', { isLoggedIn: isLoggedIn, userCart: rows ,username:user });
        console.log({isLoggedIn: isLoggedIn, username:user});
    });


});

router.get('/prodpage',(req,res) => {
    const fishName = req.query.fishName;
    const sql = 'SELECT * from fish_inventory where fish_name = ?';
    const status = req.query.LoggedStatus;
    const isLoggedIn = status === 'true';
    const user = req.query.User;

    connection.query(sql,[fishName],(err,result) =>{
        if(err){
            console.error('Error finding fish', err);
            return;
        }
         // Check if result is empty (no fish found)
         if (result.length === 0) {
            res.status(404).send('Fish not found');
            return;
        }
        res.render('prodpage',{fish:result[0],isLoggedIn:isLoggedIn,username:user} );
        console.log({isLoggedIn: isLoggedIn,username:user});

    });

});

router.get('/product_add', (req, res) =>{
    res.render('product_add');
})

router.post('/product_add',handleStocking);

router.get('/admin_listing',(req,res) => {
    const sql = 'SELECT * from fish_inventory';
    const status = req.query.LoggedStatus;
    const isLoggedIn = status === 'true';
    const isAdmin = status === 'true';
    const user = req.query.User;
    connection.query(sql,(err,rows) => {
        if(err){
            console.error('Error executing query: ', err);
            return;
        }
        res.render('admin_listing', { isLoggedIn: isLoggedIn, fishInventory: rows ,username:user });
        console.log({isLoggedIn: isLoggedIn, username:user});


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