const express = require('express');
const { userExists,passwordCheck,isAdmin } = require('./database');



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
        
        if (!exists) {
            // User does not exist, render login page again with error message
            return res.render('login', { error: 'User does not exist. Sign up now!' });
        }

        if (exists) {
            console.log('Mark3');
           // res.json({ message: 'User exists', password: password });
           passwordCheck(username, password, (err, match) => {
            if (err) {
                console.error('Error checking password:', err);
                return;
            }
            else if (!match) {
                // Password does not match, render login page again with error message
                return res.render('login', { error: 'Incorrect password.' });
            }
            else if (match) {
                //check if is admin
                isAdmin(username,(err,exists) =>{ 
                    if(err){console.error('Error checking admin status: ', err);return res.status(500).send('Error checking admin status');}
                    if (exists) {res.render('home',{ isLoggedIn: true, username: username }); console.log('pass word matches and this is an admin');}
                    else{res.render('home',{ isLoggedIn: true, username: username }); console.log('password matches and this is an regular user');}

        
                });
               // res.render('home');
                //console.log('Password matches.');
            } else {
                res.json({ message: 'password does not match for', username: username });
                console.log('Password does not match.');
            }
        });
        } else {
            console.log('mark4'); 
            res.json({ message: 'does not exists', username: username });

        }
        console.log('end of checks ');

    });
}



module.exports = { handleLogin};


