const { ObjectId } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

var id_todo = '5b5ce7161bd03b7c14bf98ba';
var id_user = '5b4fd10418d9beeb7e3ec5e8';

if (!ObjectId.isValid(id_todo)) {
  console.log('Id not valid');
}

Todo.find({
  _id: id_todo
}).then(todos => {
  console.log('Todos', todos);
});

Todo.findOne({
  _id: id_todo
}).then(todo => {
  console.log('Todo', todo);
});

Todo.findById(id_todo)
  .then(todo => {
    if (!todo) {
      return console.log('Id not found');
    }

    console.log('Todo by Id', todo);
  })
  .catch(e => {
    console.log(e);
  });

User.findById(id_user)
  .then(user => {
    if (!user) {
      return console.log('Id not found');
    }

    console.log('User by Id', user);
  })
  .catch(e => {
    console.log(e);
  });
