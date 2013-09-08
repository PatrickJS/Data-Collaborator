var mongoose = require('mongoose');
var Visualization = mongoose.model('Visualization');


var visualizations = {};

visualizations.vis = function(req, res, next, id) {
  Visualizations.findOne({ _id : id }, function(err, vis) {
    if (err) return next(err);
    if (!user) return next(new Error('Failed to load Visualization ' + id));
    req.visualization = vis;
    next();
  });
};

visualizations.show = function(req, res, next, id) {
  res.json(req.visualization || null);
};

visualizations.readComments = function(req, res, next, id) {

};


module.exports = visualizations;



