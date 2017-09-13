var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var user = require("./user");
var session = require("express-session");

var app = express();
app.use(express.static(path.join(__dirname, "/html")));
app.use(bodyParser.json());
app.use(session({
    secret: "leovant"
}));

var sessions;

app.listen(7777, function () {
    console.log("Started listening on port", 7777);
});

app.post("/signin", function (req, res) {
    var username = req.body.email;
    var password = req.body.password;

    user.validateSignIn(username, password, function (result) {
        if (result) {
            res.send("Success");
        } else {
            res.send("Failure");
        }
    });
});

app.post("/signup", function (req, res) {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.password;

    if (name && email && password) {
        user.signup(name, email, password);
    } else {
        res.send("Failure");
    }
});