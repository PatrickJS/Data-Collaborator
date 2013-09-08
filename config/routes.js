var async = require('async');

var users = require('../app/controllers/users');
var index = require('../app/controllers/index');
var visualizations = require('../app/controllers/visualizations');
var comments = require('../app/controllers/comments');
var s3 = require('../app/controllers/s3');

var routes = function(app, passport, auth) {

  // User routes
  app.get('/signin', users.signin);
  app.get('/signup', users.signup);
  app.get('/signout', users.signout);
  app.post('/users', users.create);
  app.post('/users/session', passport.authenticate('local', {failureRedirect: '/signin', failureFlash: 'Invalid email or password.'}), users.session);
  app.get('/users/me', users.me);
  app.get('/users/:userId', users.show);
  app.param('userId', users.user);
  app.param('visId', visualizations.vis);

  app.post('/upload', s3.upload);

  // Home route
  app.get('/', index.render);

  // Rest API

    // Visualization
    app.get('/users/:userID/visualizations', users.readVisualizations);


    // app.post('/visualizations', visualizations.create);

    // Comments
    app.get('/visualizations/:visId/comments', visualizations.readComments);

    // app.post('/comments', comments.create);
};

module.exports = routes;
