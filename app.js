const express = require("express");
const api = require("./FinApi.js");
const login = require("./middleware/login.js");
const app = express();
const port = 3000;

app.set("view engine","ejs");

app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.get("/unique", function (req, res) {
    res.send("This is a diff page!");
});

app.use("/login", login); //would need to add localhost/3000 if keep like this (only if want them to go login)

app.use("/api", api);

app.listen(port, function () {
    console.log('Example app listening on port ${port}!');
});