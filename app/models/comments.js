var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var CommentsSchema = new Schema({
  body: String,
  date: { type: Date, 'default': Date.now }
});


mongoose.model('Comment', CommentsSchema);