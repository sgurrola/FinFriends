const express = require('express');
const { insertUser,userExists } = require('./database');




function handleSignup(req,res){
    const {username,password,firstname,lastname,addressline,addressline2,city,state,zip } = req.body; // Assuming username and password are sent in the request body

    insertUser(username,password,firstname,lastname,addressline, addressline2, city,state,zip, (err,userId) => {
        if (err){
            console.error('Error inserting: user', err);
        }
        else{
            console.log('User inserted with ID:', userId);
            res.render('home');
        }
    });


}



module.exports = {handleSignup};

