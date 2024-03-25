const express = require('express');
const { insertUser,userExists } = require('./database');




function handleSignup(req,res){
    const {username,password,firstname,lastname,addressline,addressline2,city,state,zip } = req.body; // Assuming username and password are sent in the request body

    userExists(username, (err, exists) => {
        if(err){
            console.error('error checking user', err);
        }
        if(exists) {
            res.status(400).json({ error: 'Username is already taken' }); // Send JSON response indicating that the username is taken
        } else{
            insertUser(username,password,firstname,lastname,addressline, addressline2, city,state,zip, (err,userId) => {
                if (err){
                    console.error('Error inserting: user', err);
                }
                else{
                    console.log('User inserted with ID:', userId);
                    res.render('home',{isLoggedIn:true,username:username});
                }
            });
        
        }
    });

/*
    insertUser(username,password,firstname,lastname,addressline, addressline2, city,state,zip, (err,userId) => {
        if (err){
            console.error('Error inserting: user', err);
        }
        else{
            console.log('User inserted with ID:', userId);
            res.render('home');
        }
    });*/


}



module.exports = {handleSignup};

