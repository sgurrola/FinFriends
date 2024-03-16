var express = require("express");
var app = express();
var PORT = process.env.PORT || 3000;
const { handleLogin,router } = require('./middleware/login');

// Import database connection
var connection = require('./middleware/database').databaseConnection;

///fixes css file template
// Middleware to set Content-Type for CSS files
app.use('/styles', (req, res, next) => {
    if (req.url.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
    }
    next();
});

// Serve static files from the 'styles' directory
app.use('/styles', express.static('styles'));
//////
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
    res.render('home'); //render willl look into a views folder
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





/*


app.get('/login', (req, res) => {

    let sql = 'SELECT * FROM users';
    
    connection.query(sql, (err, result) => {
    
    if (err) throw err;
    
    console.log(result);
    
    res.send('users received');
    
    });
    
    });

*/