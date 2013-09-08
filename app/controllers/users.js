
/**
 * Module dependencies.
 */

var mongoose = require('mongoose'),
    User = mongoose.model('User');

var users = {};

//exports.signin = function(req, res) {}

/**
 * Auth callback
 */

users.authCallback = function(req, res, next) {
  res.redirect('/');
};

/**
 * Show login form
 */

users.signin = function(req, res) {
  res.render('users/signin', {
    title: 'Signin',
    message: req.flash('error')
  });
};

/**
 * Show sign up form
 */

users.signup = function(req, res) {
  res.render('users/signup', {
    title: 'Sign up',
    user: new User()
  });
};

/**
 * Logout
 */

users.signout = function(req, res) {
  req.logout();
  res.redirect('/');
};

/**
 * Session
 */

users.session = function(req, res) {
  res.redirect('/');
};

/**
 * Create user
 */

users.create = function(req, res, next) {
  var user = new User(req.body);
  user.provider = 'local';
  user.save(function (err) {
    if (err) {
      return res.render('users/signup', { errors: err.errors, user: user });
    }
    req.logIn(user, function(err) {
      if (err) return next(err);
      return res.redirect('/');
    });
  });
};

/**
 *  Show profile
 */

users.show = function(req, res) {
  var user = req.profile;
  res.render('users/show', {
    title: user.name,
    user: user
  });
};

users.me = function(req, res) {
  res.jsonp(req.user || null);
};

/**
 * Find user by id
 */

users.user = function(req, res, next, id) {
  User
    .findOne({ _id : id })
    .exec(function (err, user) {
      if (err) return next(err);
      if (!user) return next(new Error('Failed to load User ' + id));
      req.profile = user;
      next();
    });
};

module.exports = users;
