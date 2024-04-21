const express = require('express');
const { insertFish,fishExists,addAudit } = require('./database');




function handleStocking(req,res){
    const {fish_name,price,image,describe,quantity} = req.body; // Assuming username and password are sent in the request body
    const user = req.body.admin;

    console.log('this is at the begging of handle stocking and this is the user value',user);
   
    //const admin = req.query.user;

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
                    //audit log 
                    //
                    addAudit('add',fish_name,user,(err,fishId) =>{
                    if (err) {
                        console.error('Error adding to audit log',err);
                    }
                    else{
                        console.log(user,'added a product');
                    }


                    });
                    res.redirect('back');

                    console.log(image);
                }
            });
        
        }
    });


}



module.exports = {handleStocking};