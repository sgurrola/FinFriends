const express = require('express');
const { insertFish,fishExists } = require('./database');




function handleStocking(req,res){
    const {fish_name,price,image,describe,quantity} = req.body; // Assuming username and password are sent in the request body
    const user = req.query.User;

    fishExists(fish_name, (err, exists) => { 
        if(err){
            console.error('error checking fish', err);
        }
        if(exists) {
            res.status(400).json({ error: 'Fish is already there' }); // Send JSON response indicating that the username is taken
        } else{
            insertFish(fish_name,price,image,describe,quantity, (err,fishId) => {
                if (err){
                    console.error('Error inserting: fish', err);
                }
                else{
                    console.log('Fish inserted with ID:', fishId);
                    res.redirect('back');

                    //res.render('home',{isLoggedIn:true,admin:true,username:user});
                    console.log(image);
                }
            });
        
        }
    });


}



module.exports = {handleStocking};