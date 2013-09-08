var fs = require('fs');

var s3 = {};

s3.upload = function(req, res, next) {
  console.log(req);
};

module.exports = s3;