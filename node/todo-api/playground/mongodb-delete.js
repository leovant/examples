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
      .deleteMany({ text: 'Eat lunch' })
      .then(result => {
        console.log(result);
      });

    db.collection('Todos')
      .deleteOne({ text: 'Work a lot' })
      .then(result => {
        console.log(result);
      });

    db.collection('Todos')
      .findOneAndDelete({ completed: false })
      .then(result => {
        console.log(result);
      });

    // client.close();
  }
);
