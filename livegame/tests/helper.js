const chai = require('chai');
const path = require('path');

require('dotenv').config({ path: path.join(__dirname, '../.env') });

global.chai = chai;
global.should = chai.should();
global.expect = chai.expect;
