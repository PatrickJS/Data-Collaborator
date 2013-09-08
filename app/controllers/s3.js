var fs = require('fs');
var AWS = require('aws-sdk');
var amazon = new AWS.S3({accessKeyId: 'AKIAINIYMNFGZJ5MPDEA',
    secretAccessKey: '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'});
var s3 = {};

s3.upload = function(req, res, next) {
  var path = req.files.files[0].path;
  var filename = req.files.files[0].originalFilename;
  fs.readFile(path, function(err, data) {
    if (err) next(err);
    console.log(data);
    amazon.putObject({Bucket: 'pimpmydata',
      Key: filename , Body: data}, function(err) {
      if (err) {
        next(err);
      }
      console.log('Images Pushed');
      res.send(filename);
      res.redirect('/#!/collaborationPage');
    });
  });
};

s3.show = function(req, res, next) {
  var name = req.params.name;
  amazon.getObject({Bucket: 'pimpmydata',
    Key: name}, function(err, data) {
      if (err) next(err);
      res.end(data.Body.toString());
    });
};

module.exports = s3;
