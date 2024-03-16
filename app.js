var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
const { handleLogin,router } = require('./middleware/login');

// Import database connection
var connection = require('./middleware/database').databaseConnection;

const bodyParser = require('body-parser');
// Parse JSON bodies
app.use(bodyParser.json());

// Parse URL-encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set("view engine","ejs");

// Serve static files from the public directory
app.use(express.static('public'));

// Route to render the home page
app.get('/',  (req, res) => {
    res.render('home');
});

// Route to render the login page (GET request)
app.get('/login', (req, res) => {
    res.render('login');
});

// Route to handle login form submission (POST request)
app.post('/login', handleLogin);

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});



/*var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
const { handleLogin } = require('./middleware/login');

var connection = require('./middleware/database').databaseConnection;


//set the view engine to EJS
app.set("view engine","ejs");

//serve static files from the public directory
app.use(express.static('public'));

app.get('/',  (req, res) => {
    res.render('home');
});

//app.post('/login', handleLogin); //included this

//define a route to render the login page
app.get('/login',(req,res) => {
    res.render('login');
}).post('/login',handleLogin);



app.get('/login', (req, res) => {

    let sql = 'SELECT * FROM users';
    
    connection.query(sql, (err, result) => {
    
    if (err) throw err;
    
    console.log(result);
    
    res.send('users received');
    
    });
    
    });

//start the server
app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
});*/