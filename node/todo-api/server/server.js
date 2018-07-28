var express = require('express');
var bodyParser = require('body-parser');

var { mongoose } = require('./db/mongoose.js');
var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();
app.use(bodyParser.json());

// CRUD for todos
app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then(
    doc => {
      res.send(doc);
    },
    err => {
      res.status(400).send();
    }
  );
});

app.get('/todos', (req, res) => {
  Todo.find()
    .then(todos => {
      res.send({ todos });
    })
    .catch(err => {
      res.status(400).send(err);
    });
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

module.exports = { app };
