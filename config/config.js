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
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/pimp-my-data-development',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Pimp my Data - Development'
    }
  },
  test: {
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/pimp-my-data-test',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Pimp my Data - Test'
    }
  },
  production: {
    db: process.env.MONGOLAB_URI || process.env.MONGOHQ_URL || 'mongodb://localhost/pimp-my-data-production',
    root: rootPath,
    notifier: notifier,
    app: {
      name: 'Pimp my Data - Production'
    }
  }
};
