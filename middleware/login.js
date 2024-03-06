const sqlConnection = require("./sqlConnection");
const express = require("express");
const router = express.Router();
//const {passwordCheck} = require("./sqlConnection");
//const {createUser} = require("./sqlConnection");
router.get("/", function (req, res) {
    res.render("login");
});

router.post("/", function (req, res) { //look into next function for router
    login();
    //const result = login();
    //do stuff based on response in login()
    
});

function login()
{
    //move to ejs w scripttag at top can have separate file for more complex
    const user = document.getElementById("username").value;
    const pass = document.getElementById("keypass").value;

    if(user === "" || pass === ""){ 
        alert("Please fill all fields");
        return;
    }
    //console.log("Entered with username:",user,"and password:",pass);
    //window.location.href = ("/home.html");
    try {
        const exists = sqlConnection.userExists(user);
        
        if(exists) {
            alert("user exists"); //change from alert to response or message
            //put in password check
        }
        else {
            alert("user does not exist");
        }
    }
    catch (error){
        console.error("Error during login:", error);
        alert("An error occurred during login");
    }
}

function signup(){
    const user = document.getElementById("create-username").value;
    const pass = document.getElementById("create-keypass").value;
    const first = document.getElementById("first_name").value;
    const form = document.getElementById("account-type-form");
    const isCustomerChecked = document.getElementById("customer").checked;
    const isSellerChecked = document.getElementById("seller").checked;
    if (!isCustomerChecked && !isSellerChecked) {
    alert("Please select an account type");
    return false;
    console.log("New account created with username:", user, ",password:",pass,",and first name:",first);
    if(user === "" || pass === "" || first === ""){
        alert("Please fill all fields");
        return;
    }
    window.location.href = ("/home.html");
}
}

module.exports = router;

