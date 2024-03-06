const { Client } = require('pg');

// Database connection configuration
const dbConfig = {
  user: 'SWE team',
  password: 'password',
  host: 'localhost',
  port: '5432',
  database: 'postgres',
  port: 5432,
};

// Create a new PostgreSQL client
const client = new Client(dbConfig);

// Connect to the database
client.connect()
  .then(() => {
    console.log('Connected to PostgreSQL database');
  })
  
  .catch((err) => {
    console.error('Error connecting to PostgreSQL database', err);
  });

function userExists(user) {
    //alert("called userExists");
    client.query('SELECT * FROM USERS WHERE $1 in (username)', [user], (err, result) =>{     
      if (result.rowCount != 0) {
          console.log("user exists");
          return true;
        } else {
          console.log("user does not exist");
          return false; //currently does nothing, need to
          
        };
    });
}
//exports.userCheck = {userExists};
//create user
//password check

function passwordCheck(user, password) {
  client.query('SELECT * FROM USERS WHERE $1 in (username) AND $2 in (keypass)', [user, password], (err, result) =>{ 
    if (result.rowCount != 0) {
      console.log("correct password");
      return true;
    } else {
      console.log("wrong password");
      return false; //currently does nothing, need to
    };
  });
}

function createUser(user) {
  const query = 'INSERT INTO users (username, keypass, first_name, last_name, seller, admin_perms) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
  const userdata = [user.username, user.keypass, user.first_name, user.last_name, user.seller, user.admin_perms];
  client.query(query, userdata)
    .then(result => {
      console.log('User inserted successfully:', result.rows[0]);
    })
    .catch(err => console.error('Error inserting user:' , err))
    .finally(() => {
      client.end();
    });


}

module.exports = {userExists, passwordCheck, createUser}; //change to router

//password quality (last)



//fish data for page

/*
client.query('SELECT * FROM USERS', (err, result) => {
  if(err) {
    console.error('Error');
  } else {
    console.log('Query Result', result.rows);
  }
});
/*
1



/*
//close db connection
client.end()
    .then(() => {
      console.log('Connection to PostgreSQL closed');
    })
    .catch((err) => {
      console.error('Error closing connection', err);
    });
// Execute SQL queries here

    client.query('SELECT * FROM employees', (err, result) => {
      if (err) {
        console.error('Error executing query', err);
      } else {
        console.log('Query result:', result.rows);
      }

      
    });
*/