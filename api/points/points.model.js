const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PointSchema = new mongoose.Schema({
  name: {type: String, required: true},
  // game related to these points
  // one game can have several types of points
  game: {type: String, required: true},
  created: {type: Date, required: true, default: new Date()}
},
{
  collection: 'points'
});

PointSchema.index({name: 1, game: 1}, {unique: true});

module.exports = mongoose.model('PointModel', PointSchema);
