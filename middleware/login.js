const express = require('express');
const { userExists,passwordCheck } = require('./database');



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
                res.render('home');
                console.log('Password matches.');
            } else {
                res.json({ message: 'password does not match for', username: username });
                console.log('Password does not match.');
            }
        });
           // res.render('login', { error: 'User exists, password is -> ', password });
        } else {
            console.log('mark4'); 
            res.json({ message: 'does not exists', username: username });

            //res.render('login', { error: 'User does not exist' });
        }
        console.log('end of checks ');

    });
}

//function createUser(req,res)
module.exports = { handleLogin};


