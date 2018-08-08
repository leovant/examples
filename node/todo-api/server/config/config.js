var env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
  var config = require('./config.json');
  var env_config = config[env];

  Object.keys(env_config).forEach(key => {
    process.env[key] = env_config[key];
  });
}
