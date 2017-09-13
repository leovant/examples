var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
app.use(express.static(path.join(__dirname, "/html")));
app.use(bodyParser.json());

app.listen(7777, function () {
    console.log("Started listening on port", 7777);
});

app.post("/signin", function (req, res) {
    var username = req.body.email;
    var password = req.body.password;

    if (username == "admin" && password == "admin") {
        res.send("Success");
    } else {
        res.send("Failure");
    }
});

app.post("/signup", function (req, res) {
    res.send({
        name: req.body.name,
        username: req.body.email,
        password: req.body.password
    });
});