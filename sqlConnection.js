const mysql = require("mysql");
let db_con = mysql.createConnection({
    host:"localhost",
    user: "root",
    password: ''
});

db_con.connect((err) => {
    if (err) {
        console.log("no connect to user DB", err);
    } else {
        console.log("connected!");
    }
});

module.exports = db_con;

/*
const express = require("express"); 
const database = require('./sqlConnection'); 
  
const app = express(); 
  
app.listen(5000, () => { 
  console.log(`Server is up and running on 5000 ...`); 
});

app.get("/createDatabase", (req, res) => { 
  
    let databaseName = "gfg_db"; 
  
    let createQuery = `CREATE DATABASE ${databaseName}`; 
  
    // use the query to create a Database. 
    database.query(createQuery, (err) => { 
        if(err) throw err; 
  
        console.log("Database Created Successfully !"); 
  
        let useQuery = `USE ${databaseName}`; 
        database.query(useQuery, (error) => { 
            if(error) throw error; 
  
            console.log("Using Database"); 
              
            return res.send( 
`Created and Using ${databaseName} Database`); 
        }) 
    }); 
});
*/