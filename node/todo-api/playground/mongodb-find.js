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
      .find({ _id: new ObjectID('5b4e700b7aac683add03dfdd') })
      .toArray()
      .then(
        docs => {
          console.log('Todos');
          console.log(JSON.stringify(docs, undefined, 2));
        },
        err => {
          console.log('Unable to fetch todos', err);
        }
      );

    db.collection('Todos')
      .find()
      .count()
      .then(
        count => {
          console.log(`Todos count: ${count}`);
        },
        err => {
          console.log('Unable to fetch todos', err);
        }
      );

    db.collection('Users')
      .find({ location: 'Nonoai' })
      .toArray()
      .then(
        docs => {
          console.log('Users from Nonoai');
          console.log(JSON.stringify(docs, undefined, 2));
        },
        err => {
          console.log('Unable to fetch users', err);
        }
      );

    // client.close();
  }
);
