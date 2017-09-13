var MongoClient = require("mongodb").MongoClient;
var assert = require("assert");
var url = "mongodb://localhost:32768/Blog";

module.exports = {
    signup: function (name, email, password) {
        MongoClient.connect(url, function (err, db) {
            db.collection("users").insertOne({
                "name": name,
                "email": email,
                "password": password
            }, function (err, result) {
                assert.equal(err, null);
                console.log("Saved user sign up details.");
            });
        });
    },
    validateSignIn: function (username, password, callback) {
        MongoClient.connect(url, function (err, db) {
            db.collection("users").findOne({
                email: username,
                password: password
            }, function (err, result) {
                if (result === null) {
                    callback(false);
                } else {
                    callback(true);
                }
            });
        });
    }
}