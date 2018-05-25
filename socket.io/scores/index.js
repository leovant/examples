var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var data = require('./data.js');
var latestData;

data.getData().then(result => {
  latestData = result;
});

io.on('connection', socket => {
  console.log('Client connection received.');

  socket.emit('data', latestData);

  socket.on('receivedFromClient', data => {
    console.log(data);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

http.listen(3000, () => {
  console.log('HTTP server started on port 3000.');
});

setInterval(() => {
  data
    .getData()
    .then(result => {
      latestData = result;

      io.emit('data', latestData);

      console.log('Last updated: ' + new Date());
    })
    .catch(error => {
      console.error(error);
    });
}, 300000);
