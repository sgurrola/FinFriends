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



async function createOrder(username, subtotal, callback) {
  try {
    // Calculate total with tax
    const total = subtotal * 1.0825;
    
    // Insert order into ORDERS table
    const orderInsertResult = await insertOrder(username, total);
    const orderNum = orderInsertResult.insertId;
    
    // Add items to the order
    await addItemsToOrder(username, orderNum);
    
    // Remove items from the user's cart
    await removeFromCartItems(username);

    console.log('Order created successfully');
    callback(null, orderNum);
  } catch (err) {
    console.error('Error creating order:', err);
    callback(err);
  }
}

async function insertOrder(username, total) {
  const sql = 'INSERT INTO ORDERS (username, total) VALUES (?, ?)';
  return await query(sql, [username, total]);
}

async function addItemsToOrder(username, orderNum) {
  const sqlSelect = 'SELECT prod_name, inventory_type, quantity FROM user_cart WHERE username = ?';
  const sqlInsert = 'INSERT INTO items_in_order (order_id, prod_name, inventory_type, quantity) VALUES (?, ?, ?, ?)';
  const items = await query(sqlSelect, [username]);

  for (const item of items) {
    await query(sqlInsert, [orderNum, item.prod_name, item.inventory_type, item.quantity]);
  }
}

async function removeFromCartItems(username) {
  const sql = 'DELETE FROM user_cart WHERE username = ?';
  return await query(sql, [username]);
}

async function query(sql, values) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, result) => {
      if (err) {
        reject(err);
      } else {
        resolve(result);
      }
    });
  });
}


//remove from cart: (item._id, Inventory Type,callback), just delete that item from the table //similar functionality for owners

/*
///create order not done
function createOrder(username, subtotal, callback) {
  // Calculate total with tax
  var total = subtotal * 1.0825;
  
  // Initialize orderNum
  var orderNum = 0;
  
  // Insert order into ORDERS table
  let sql = 'INSERT INTO ORDERS (username, total) VALUES (?, ?)';
  connection.query(sql, [username, total], (err, result) => {
    if (err) {
      return callback(err);
    }

    orderNum = result.insertId;
    
    //callback(null, orderNum);
   
    // Add items to the order
    addItemsToOrder(username, orderNum,(err,result) =>{
      if(err){
        console.error('Error adding items to order', err);
      }
      if (result) {
        console.log('items added to order');
      }
    });

    // Remove items from the user's cart
    removeFromCartItems(username, (err, result) => {
      if (err) {
        console.error('Error removing cart items after purchase:', err);
      }
      if (result) {
        console.log('Cart should now be clear');
      }
    });

  });

}


function addItemsToOrder(username,orderNum,callback){

  
  let sql = 'SELECT prod_name, inventory_type,quantity FROM user_cart where username = ?';
  let sql2 = 'INSERT into items_in_order (order_id,prod_name, inventory_type, quantity) VALUES (?,?,?,?)';  
  connection.query(sql,[username],(err,items) =>{
      if (err){
        return callback(err);
      }
      //callback(null,items);

      items.forEach(row => {
        connection.query(sql2,[orderNum,row.prod_name,row.inventory_type,row.quantity],(err,result));
        if(err){
          return callback(err);
        }
      });

    });
    callback(null,"Items inserted succesfully to order");

}

function removeFromCartItems(username,callback){

  let sql = 'DELETE FROM user_cart WHERE username = ?';
  connection.query(sql,[username],(err,result) =>{
    if(err){
      return callback(err);
    }
    callback(null,result);

  });


}*///theser items are removed from cart since they are in order





module.exports = {
  userExists,passwordCheck,insertUser,isAdmin,addToCart,createOrder,
  databaseConnection: connection
};