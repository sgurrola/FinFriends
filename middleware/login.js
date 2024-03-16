const express = require('express');
const { userExists } = require('./database');


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
            res.json({ message: 'User exists', password: password });

           // res.render('login', { error: 'User exists, password is -> ', password });
        } else {
            console.log('mark4');
            res.json({ message: 'does not exists', username: username });

            //res.render('login', { error: 'User does not exist' });
        }
        console.log('end of checks ');

    });
}

module.exports = { handleLogin};//, router };


