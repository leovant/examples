const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var message = 'I am user number 3';
var hash = SHA256(message).toString();

console.log('Message:', message);
console.log('Hash:', hash);

var data = {
  id: 4
};

var token = {
  data,
  hash: SHA256(JSON.stringify(data) + 'somesecret').toString()
};

token.data.id = 5;
token.hash = SHA256(JSON.stringify(token.data)).toString();

var resultHash = SHA256(JSON.stringify(token.data) + 'somesecret').toString();

if (resultHash === token.hash) {
  console.log('Data was not changed.');
} else {
  console.log('Data was changed.');
}

var token = jwt.sign(data, '123abc');
console.log('JWT:', token);

var decoded = jwt.verify(token, '123abc');
console.log('Decoded:', decoded);

var password = '123abc';

bcrypt.genSalt(10, (err, salt) => {
  bcrypt.hash(password, salt, (err, hash) => {
    console.log('Bcrypt:', hash);
  });
});

var hashed_pass =
  '$2a$10$uNzI.C0eFAAvLzenQiAQjuLfHyzCTBWRmEsjE6xsy1LCw3kIP9gQm';

bcrypt.compare(password, hashed_pass, (err, res) => {
  console.log('Match:', res);
});
