const path = require('path');
const dotenv = require('dotenv');

dotenv.config({ path: path.join(__dirname, '../../../.env') });

const observer = require('./observer');
const cron = require('./cron');
const Logger = require('../../services/Logger');

const whatToRun = process.argv[2];
let worker;

switch (whatToRun) {
  case 'cron':
    worker = cron.start;
    break;
  case 'observer':
    worker = observer.start;
    break;
  default:
    worker = () => null;
}

try {
  worker();
} catch (error) {
  Logger.error(error.message || JSON.stringify(error));
}

Logger.info('Live matches worker started.');
