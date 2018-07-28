const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect(
  'mongodb://localhost:27017/TodoApp',
  (err, client) => {
    if (err) {
      return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected do MongoDB server.');
    const db = client.db('TodoApp');

    db.collection('Todos')
      .findOneAndUpdate(
        { _id: new ObjectID('5b4e700b7aac683add03dfdd') },
        { $set: { completed: true } },
        { returnOriginal: false }
      )
      .then(result => {
        console.log(result);
      });

    db.collection('Users')
      .findOneAndUpdate(
        { _id: new ObjectID('5b4e78092bdc5bf3e5c64a55') },
        { $set: { name: 'Leovan' }, $inc: { age: 1 } },
        { returnOriginal: false }
      )
      .then(result => {
        console.log(result);
      });

    // client.close();
  }
);
