var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var user = require('./user');
var post = require('./post');

var app = express();
app.use(express.static(path.join(__dirname, '/html')));
app.use(bodyParser.json());
app.use(
  session({
    secret: 'leovant'
  })
);

var sessions;

app.listen(7777, function() {
  console.log('Started listening on port', 7777);
});

app.post('/signin', function(req, res) {
  sessions = req.session;
  var username = req.body.email;
  var password = req.body.password;

  user.validateSignIn(username, password, function(result) {
    if (result) {
      sessions.username = username;
      res.send('Success');
    }
  });
});

app.post('/signup', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var password = req.body.password;

  if (name && email && password) {
    user.signup(name, email, password);
  } else {
    res.send('Failure');
  }
});

app.get('/home', function(req, res) {
  if (sessions && sessions.username) {
    res.sendFile(__dirname + '/html/home.html');
  } else {
    res.send('Unauthorized');
  }
});

app.post('/posts', function(req, res) {
  var title = req.body.title;
  var subject = req.body.subject;

  post.addPost(title, subject, function(result) {
    res.send(result);
  });
});

app.get('/posts', function(req, res) {
  post.getPosts(function(result) {
    res.send(result);
  });
});
