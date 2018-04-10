const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GameSchema = new mongoose.Schema({
  name: {type: String, required: true},
  created: {type: Date, required: true, default: new Date()}
},
{
  collection: 'games'
});

GameSchema.index({name: 1}, {unique: true});

module.exports = mongoose.model('GameModel', GameSchema);
