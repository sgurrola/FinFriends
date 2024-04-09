const express = require('express');
const { userExists,passwordCheck,isAdmin } = require('./database');
var connection = require('./database').databaseConnection;



function handleLogin(req, res) {
    const { username, password } = req.body; // Assuming username and password are sent in the request body
    
    // Check if the user exists
    userExists(username, (err, exists) => {
        console.log('Mark 1');

        if (err) {
            console.log('Mark2');
            // Handle database error
            return res.status(500).send('Error checking user existence');
        }
        

        if (exists) {
            console.log('Mark3');
           // res.json({ message: 'User exists', password: password });
           passwordCheck(username, password, (err, match) => {
            if (err) {
                console.error('Error checking password:', err);
                return;
            }
            if (match) {
                //check if is admin
                isAdmin(username,(err,exists) =>{ 
                    if(err){console.error('Error checking admin status: ', err); return;}
                    if (exists) {
                        const sql = 'SELECT * from fish_inventory';
                        connection.query(sql,(err,rows) => {
                            if(err){
                                console.error('Error executing query: ', err);
                                return;
                            }
                            res.render('admin_listing', { isLoggedIn: true, fishInventory: rows ,username:username });
                            console.log('password matches and this is an admin');
                    
                    
                        });
                    }
                      //  res.render('admin_listing',{ isLoggedIn: true, username: username }); 
                       // console.log('pass word matches and this is an admin');}
                
                    else{res.render('home',{ isLoggedIn: true, username: username }); console.log('password matches and this is an regular user');}

        
                });
               // res.render('home');
                //console.log('Password matches.');
            } else {
               // res.json({ message: 'password does not match for', username: username });
                res.render('login',{message:'password does not match'});
                console.log('Password does not match.');
            }
        });
        } else {
            console.log('mark4'); 
            //res.json({ message: 'does not exists', username: username });
            res.render('login',{message:'account does not exists please sign up'});

        }
        console.log('end of checks ');

    });
}



module.exports = { handleLogin};


