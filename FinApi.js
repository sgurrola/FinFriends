const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    res.send("API home page");
});

router.get("/about", function (req, res) {
    res.send("About this API");
});

module.exports = router;