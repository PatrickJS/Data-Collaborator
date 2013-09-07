var path = require('path'),
    rootPath = path.normalize(__dirname + '/..'),
    templatePath = path.normalize(__dirname + '/../app/mailer/templates'),
    notifier = {
      APN: false,
      email: false, // true
      actions: ['comment'],
      tplPath: templatePath,
      postmarkKey: 'POSTMARK_KEY',
      parseAppId: 'PARSE_APP_ID',
      parseApiKey: 'PARSE_MASTER_KEY'
    };

module.exports = {
  development: {
    db: 'mongodb://localhost/pimp-my-data-development',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Pimp my Data - Development'
    }
  },
  test: {
    db: 'mongodb://localhost/pimp-my-data-test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Pimp my Data - Test'
    }
  },
  production: {
    db: 'mongodb://localhost/pimp-my-data-production',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Pimp my Data - Production'
    }
  }
};
