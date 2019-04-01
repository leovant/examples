const config = {
  ENV: process.env.NODE_ENV || 'development',
  TEAM_ID: '', // get team id from env or command line
  FOOTSTATS_URL: process.env.FOOTSTATS_URL,
  FOOTSTATS_TOKEN: process.env.FOOTSTATS_TOKEN,
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT,
  REDIS_PASS: process.env.REDIS_PASS,
  RABBITMQ_HOST: process.env.RABBITMQ_HOST,
  RABBITMQ_PORT: process.env.RABBITMQ_PORT,
  RABBITMQ_USER: process.env.RABBITMQ_USER,
  RABBITMQ_PASS: process.env.RABBITMQ_PASS,
  AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  AWS_REGION: process.env.AWS_REGION,
  // DEEPSTREAM_HOST: process.env.DEEPSTREAM_HOST,
  // DEEPSTREAM_PORT: process.env.DEEPSTREAM_PORT,
  MOSQUITTO_HOST: process.env.MOSQUITTO_HOST
};

module.exports = config;
