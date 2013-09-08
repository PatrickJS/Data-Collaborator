var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var VisualizationSchema = new Schema({
  source: String,
  type: String,
  comments: Array
});


mongoose.model('Visualization', VisualizationSchema);


