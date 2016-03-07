var mongoose = require('mongoose');

var ArticleSchema   = new mongoose.Schema({
  name: String,
  text: String,
  category: String,
  date: Date,
  image: String
 
});

module.exports = mongoose.model('Article', ArticleSchema);