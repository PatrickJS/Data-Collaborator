var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    env = process.env.NODE_ENV || 'development';

var config = {
  development: {
    root: rootPath,
    app: {
      name: 'pimp-my-data'
    },
    port: 3000,
    db: 'mongodb://localhost/pimp-my-data-development'
  },

  test: {
    root: rootPath,
    app: {
      name: 'pimp-my-data'
    },
    port: 3000,
    db: 'mongodb://localhost/pimp-my-data-test'
  },

  production: {
    root: rootPath,
    app: {
      name: 'pimp-my-data'
    },
    port: 3000,
    db: 'mongodb://localhost/pimp-my-data-production'
  }
};

module.exports = config[env];
