var mysql = require('mysql2');
require('dotenv').config();

/*var connection = mysql.createConnection({
  host: 'localhost', //process.env.DATABASE_HOST,
  user: 'root' ,//process.env.DATABASE_USER,
  password: 'Esteban10!',//process.env.DATABASE_PASSWORD,
  database: 'fin_friends'//process.env.DATABASE_NAME
});*/

var connection = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME
});
connection.connect((err => {
  if (err) throw err;
  console.log('MySQL Connected');
}));

function userExists(username, callback) {
  let sql = 'SELECT * FROM users WHERE username = ?';
  connection.query(sql, [username], (err, results) => {
      if (err) {
          return callback(err);
      }
      callback(null, results.length > 0);
  });
}

//
function passwordCheck(username, password, callback) {
  let sql = 'SELECT * FROM users WHERE username = ? AND keypass = ?';
  connection.query(sql, [username, password], (err, results) => {
      if (err) {
          return callback(err);
      }
      callback(null, results.length > 0);
  });
}

function insertUser(username,password,first_name,last_name,address_1, address_2, city,state,zip, callback){
  let sql = 'INSERT INTO users (username,keypass,first_name,last_name,street,apt_num,city,state,zip,admin_perms) VALUES (?,?,?,?,?,?,?,?,?,FALSE)';
  connection.query(sql,[username,password,first_name,last_name,address_1,address_2,city,state,zip], (err,result) =>{
    if (err){
      return callback(err);
    }
    callback(null,result.insertId);
  });
}


function isAdmin(username,callback){
  let sql = 'SELECT * FROM users WHERE username = ? AND admin_perms = 1';
  connection.query(sql, [username], (err, results) => {
      if (err) {
          return callback(err);
      }
      callback(null, results.length > 0);
  });

}

//function to insert to cart
//takes in a username,product_id, inventory type

function addToCart(username,productName, inventoryType,price,callback){

  let sql = 'INSERT INTO USER_CART (username,prod_name,inventory_type,quantity,price) VALUES (?,?,?,1,?)';
  connection.query(sql, [username,productName,inventoryType,price],(err,result) =>{
    if (err){
      return callback(err);
    }
    callback(null,result.insertId);
  });
}

///create order not done
function createOrder(username,callback){
  //make order_id with user ID 
  //then find most recent order_id with username and date to add each item in cart to items_in_order table

}




module.exports = {
  userExists,passwordCheck,insertUser,isAdmin,addToCart,createOrder,
  databaseConnection: connection
};