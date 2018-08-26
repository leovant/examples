const expect = require('expect');
const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate the correct message object', () => {
    let from = 'Leo';
    let text = 'Message';
    let message = generateMessage(from, text);

    expect(message).toInclude({ from, text });
    expect(message.created_at).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    let from = 'Leo';
    let lat = 1;
    let long = 1;
    let url = 'https://www.google.com/maps?q=1,1';
    let message = generateLocationMessage(from, lat, long);

    expect(message).toInclude({ from, url });
    expect(message.created_at).toBeA('number');
  });
});
