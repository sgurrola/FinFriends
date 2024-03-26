//add to cart functionality
const { addToCart } = require('./database');


function addToDatabase(user,item,type,price){

    addToCart(user,item,type,price, (err, result) => {
        if(err){
            console.error('error adding to cart', err);
        }
        if(result){
            console.log('Inserted into cart');
        }
    });

}


module.exports ={addToDatabase};