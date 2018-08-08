const { ObjectId } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Todo.remove({}).then(result => {
//   console.log(result);
// });

Todo.findByIdAndRemove('5b5cf509987ac7c1dacc1040').then(todo => {
  console.log(todo);
});
